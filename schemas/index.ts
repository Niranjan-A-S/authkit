import { Role } from '@prisma/client';
import z from 'zod';

export const LoginSchema = z.object({
    email: z.string().email({
        message: 'Email is Required'
    }),
    password: z.string().min(1, {
        message: 'Password is required'
    }),
    code: z.optional(z.string())
});

export const SettingsSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    newPassword: z.string().min(6),
    role: z.enum([Role.ADMIN, Role.USER]),
    isTwoFactorEnabled: z.boolean()
})
    .partial()
    .refine(data => {
        if (data.password && !data.newPassword) {
            return false;
        }
        return true;
    }, {
        message: 'New password is required',
        path: ['newPassword']
    })
    .refine(data => {
        if (data.newPassword && !data.password) {
            return false;
        }
        return true;
    }, {
        message: 'Password is required',
        path: ['password']
    });

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Email is Required'
    }),
    password: z.string().min(6, {
        message: 'Minimum 6 characters required'
    }),
    name: z.string().min(1, {
        message: 'Name is required'
    })
});

export const ResetPasswordSchema = z.object({
    email: z.string().email({
        message: 'Email is Required'
    })
});

export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: 'Minimum 6 characters required'
    })
});
