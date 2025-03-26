import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const app = express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(cors())

app.post("/challenges", async (req, res) => {
    const { title, description, totalDays, createdAt, completedDays } = req.body

    try {
        const newChallenge = await prisma.challenge.create({
            data: {
                title,
                description: description ?? null,
                totalDays: totalDays ?? null,
                completedDays: 0,
                isCompletedToday: false,
                lastCompletedDate: null,
            },
        })

        res.status(201).json(newChallenge);
    } catch (error) {
        res.status(500).json({ error: "Ошибка при создании челленджа" })
    }
});

app.get("/challenges", async (req, res) => {
    try {
        const challenges = await prisma.challenge.findMany()
        res.json(challenges)
    } catch (error) {
        res.status(500).json({ error: "Ошибка получения данных" })
    }
})

app.get("/challenges/:id", async (req, res) => {
    const { id } = req.params

    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        })

        if (!challenge) {
            return res.status(404).json({ error: "Челлендж не найден" })
        }

        res.json(challenge)
    } catch (error) {
        res.status(500).json({ error: "Ошибка при получении челленджа" })
    }
})

app.post("/challenges/:id/complete", async (req, res) => {
    const { id } = req.params

    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        })

        if (!challenge) {
            return res.status(404).json({ error: 'Челлендж не найден' })
        }

        const newIsCompletedToday = !challenge.isCompletedToday

        const updatedChallenge = await prisma.challenge.update({
            where: { id },
            data: {
                completedDays: newIsCompletedToday ? { increment: 1 } : { decrement: 1 },
                isCompletedToday: newIsCompletedToday,
                lastCompletedDate: newIsCompletedToday ? new Date() : null,
            },
        })

        res.json(updatedChallenge)
    } catch (error) {
        res.status(500).json({ error: 'Ошибка обновления челленджа' })
    }
})

app.delete("/challenges/:id", async (req, res) => {
    const { id } = req.params

    try {
        await prisma.challenge.delete({
           where: { id }
        })
        res.json({ message: "Челлендж удален" });
    } catch (error) {
        console.error("Ошибка при удалении:", error);
        res.status(500).json({ error: "Ошибка при удалении челленджа" });
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`))
