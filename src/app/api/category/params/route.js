import axios from 'axios';
import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';
import React from 'react';

const cache = new NodeCache({ stdTTL: 0 }); // Cache sẽ hết hạn sau 300 giây (5 phút)

export const GET = React.cache(async () => {
  try {
    const cachedData = cache.get('paramsData');
    if (cachedData) {
      return NextResponse.json(cachedData);
    }

    const resp = await axios.get(
      `https://api.lzt.market/steam/params`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.TOKEN}`
        }
      }
    );

    cache.set('paramsData', resp?.data);
    return NextResponse.json(resp?.data);
  } catch (err) {
    console.log('Error when fetching params data', err);
    console.error(err);
    return NextResponse.json({});
  }
});
