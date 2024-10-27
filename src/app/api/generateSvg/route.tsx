import satori from 'satori';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { convertSvgToPngByResvg } from '@/app/utils/convertSvgToPngByResvg';

// 폰트 로드
const nanumBuffer = fs.readFileSync(
  path.join(process.cwd(), 'src', 'app', 'fonts', 'NanumGimYuICe.ttf')
);

const timeFontBuffer = fs.readFileSync(
  path.join(process.cwd(), 'src', 'app', 'fonts', 'time.ttf')
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date') || '';
  const text = searchParams.get('text') || '';
  const uploadedImageUrl = searchParams.get('uploadedImageUrl') || '';

  try {
    // Satori로 SVG 생성
    const svg = await satori(
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          height: '100vh',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', position: 'relative' }}>
            <img
              src="https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/frame.jpg"
              alt="폴라로이드"
              style={{ height: '1032px', width: '648px' }}
            />
          </div>
          <img
            src={uploadedImageUrl}
            alt="이미지"
            style={{
              display: 'flex',
              objectFit: 'contain',
              position: 'absolute',
              top: '86px',
              left: '33px',
              height: '764px',
              width: '576px',
            }}
          />
          <div
            style={{
              display: 'flex',
              position: 'absolute',
              fontSize: '30px',
              bottom: '210px',
              right: '80px',
              fontFamily: 'timeFont',
              color: '#facc15',
            }}
          >
            <span>{date}</span>
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              maxWidth: '570px',
              position: 'absolute',
              bottom: '30px',
              left: '35px',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                padding: '8px',
                zIndex: 50,
                backgroundColor: 'transparent',
                resize: 'none',
                fontSize: '40px',
                color: '#1f2937',
                fontFamily: 'nanumFont',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>,
      {
        width: 1000,
        height: 1400, // 적절한 높이로 설정
        fonts: [
          {
            style: 'normal',
            name: 'nanum',
            data: nanumBuffer,
            weight: 600,
          },
          {
            style: 'normal',
            name: 'timeFont',
            data: timeFontBuffer,
            weight: 600,
          },
        ],
      }
    );

    const pngBuffer = convertSvgToPngByResvg(svg);

    // 성공적으로 SVG를 생성한 후 반환
    return new NextResponse(pngBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    });
  } catch (error) {
    console.error('SVG 생성 오류:', error);
    return new NextResponse('SVG 생성 오류', { status: 500 });
  }
}
