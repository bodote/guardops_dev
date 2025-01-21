import { NextResponse } from 'next/server';

export async function GET() {
    // Dummy data for the prompts list
    const data = [
        {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Email Marketing Campaign',
            timestamp: '2024-03-20T15:30:00Z',
            lastModified: '2024-03-20T16:45:00Z'
        },
        {
            id: '987fcdeb-51a2-43e8-9876-543210fedcba',
            name: 'Product Description Generator',
            timestamp: '2024-03-19T10:20:00Z',
            lastModified: '2024-03-19T14:30:00Z'
        },
    ];

    return NextResponse.json(data);
}