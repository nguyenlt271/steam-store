import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const resp = await axios.get(`https://api.lzt.market/steam/params`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TOKEN}`
      }
    });
    return NextResponse.json(resp.data);
  } catch (err) {
    console.log('Error', err);
    throw new Error('Failed to fetch params!');
  }
};
