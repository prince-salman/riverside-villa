import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // ImgBB API Key (Server-side proxy)
    const apiKey = 'cf13597c7f55e937e3343aff70c0b81a';
    
    // Create FormData for ImgBB
    const imgbbFormData = new FormData();
    imgbbFormData.append('key', apiKey);
    imgbbFormData.append('image', base64Image);

    // Upload to ImgBB
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: imgbbFormData,
    });

    const result = await response.json();

    if (result.success) {
      // result.data.url contains the direct image URL
      return NextResponse.json({ url: result.data.url });
    } else {
      console.error('ImgBB Upload Error:', result);
      return NextResponse.json({ error: result?.error?.message || 'Failed to upload image to cloud' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
