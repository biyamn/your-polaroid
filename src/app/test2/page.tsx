export default function Page() {
  const date = '2024-02-02';
  const text =
    '오늘은 불꽃축제에 다녀왔다ㅎㅎ 너무 예뻤다!! 친구와 함께 여의도에 갔다~';
  const uploadedImageUrl =
    'https://eagdqfebxhcyrcckqfho.supabase.co/storage/v1/object/public/polaroid-image/ab57d3f2-1acb-4c34-98ef-ed377b2e70df';
  return (
    <div>
      <img
        src={`http://localhost:3000/api/og?date=${date}&text=${text}&uploadedImageUrl=${uploadedImageUrl}`}
        alt="Generated PNG by @vercel/og"
      />
    </div>
  );
}
