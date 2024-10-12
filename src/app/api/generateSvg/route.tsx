import satori from 'satori';
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// 폰트 로드
const neoFontBuffer = fs.readFileSync(
  path.join(process.cwd(), 'src', 'app', 'fonts', 'Pretendard-Regular.woff')
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
              style={{ height: '516px', width: '324px' }}
            />
          </div>

          <div
            style={{
              position: 'absolute',
              top: '10px',
              left: '4px',
              height: '382px',
              width: '288px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', inset: 0, position: 'absolute' }}>
              <div
                style={{
                  display: 'flex',
                  height: '382px',
                  width: '288px',
                  backgroundColor: 'white',
                }}
              />
              <img
                src={uploadedImageUrl}
                alt="이미지"
                style={{
                  display: 'flex',
                  objectFit: 'contain',
                  height: '100%',
                  width: '100%',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              position: 'absolute',
              bottom: '36px',
              right: '10px',
            }}
          >
            <span>{date}</span>
          </div>

          <div
            style={{
              display: 'flex',
              width: '100%',
              position: 'relative',
              top: '-16px',
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
                fontSize: '15px',
                color: '#1F2937', // text-gray-900
              }}
            >
              {text}
            </div>
          </div>
        </div>
      </div>,
      {
        width: 400,
        height: 600, // 적절한 높이로 설정
        fonts: [
          {
            style: 'normal',
            name: 'neo',
            data: neoFontBuffer,
            weight: 600,
          },
        ],
      }
    );

    // 성공적으로 SVG를 생성한 후 반환
    return new NextResponse(svg, {
      status: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
      },
    });
  } catch (error) {
    console.error('SVG 생성 오류:', error);
    return new NextResponse('SVG 생성 오류', { status: 500 });
  }
}
