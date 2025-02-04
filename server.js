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
    const { title, description, totalDays } = req.body

    try {
        const newChallenge = await prisma.challenge.create({
            data: {
                title,
                description: description || null,
                totalDays: totalDays ?? null,
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
            return res.status(404).json({ error: "Челлендж не найден" })
        }

        // Проверяем, что completedDays не превышает totalDays
        if (challenge.completedDays >= challenge.totalDays) {
            return res.status(400).json({ error: "Челлендж уже завершен" })
        }

        const updatedChallenge = await prisma.challenge.update({
            where: { id },
            data: { completedDays: { increment: 1 } },
        })

        res.json(updatedChallenge);
    } catch (error) {
        res.status(500).json({ error: "Ошибка обновления челленджа" })
    }
})


app.post("/challenges/:id/uncomplete", async (req, res) => {
    const { id } = req.params

    try {
        const challenge = await prisma.challenge.findUnique({
            where: { id },
        })

        if (!challenge) {
            return res.status(404).json({ error: "Челлендж не найден" })
        }

        if (challenge.completedDays <= 0) {
            return res.status(400).json({ error: "Нельзя уменьшить completedDays ниже 0" })
        }

        const updatedChallenge = await prisma.challenge.update({
            where: { id },
            data: { completedDays: { decrement: 1 } },
        })

        res.json(updatedChallenge)
    } catch (error) {
        res.status(500).json({ error: "Ошибка обновления челленджа" })
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`))
