import axios from 'axios';
import { NextResponse } from 'next/server';
import React from 'react';


export const GET = React.cache(async (request) => {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(new URLSearchParams(url.search));

    const resp = await axios.get(
      `https://api.lzt.market/steam`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
        params: {
          ...params,
        }
      }
    );

    return NextResponse.json(resp?.data);
  } catch (err) {
    console.error(err);
    throw new Error('Error fetching accounts data');
  }
});
