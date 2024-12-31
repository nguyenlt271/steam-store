import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { id } = params; // Lấy `id` từ URL

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log('ID from URL:', id);

    const resp = await axios.get(
      `https://api.lzt.market/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      }
    );

    return NextResponse.json(resp?.data);
  } catch (err) {
    console.error('Error handling request:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
