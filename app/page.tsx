"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

type Testi = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  likes?: number;
};

export default function Home() {
  const [data, setData] = useState<Testi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: d } = await supabase
      .from("testimonials")
      .select("*")
      .order("id", { ascending: false });
      if (d) setData(d);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen bg-[#D6EEFF] pb-10">
      <header className="text-center pt-8 px-4">
        <h1 className="text-[26px] font-black text-[#2A5A8A]">☁️ Galeri Testimoni ☁️</h1>
        <p className="text-[#4A7AB5] text-sm mt-1 font-medium">
          Rivan Store — Kumpulan bukti sewa WA & transaksi pelanggan
        </p>
        <Link
          href="/admin"
          className="inline-block mt-4 bg-[#6BA6E0] text-white px-6 py-2.5 rounded-full font-bold text-sm shadow"
        >
          🔐 Login Admin
        </Link>
      </header>

      <main className="max-w-[520px] mx-auto px-4 mt-6 space-y-5">
        <div className="bg-white/90 rounded-2xl p-4 flex justify-between items-center">
          <h2 className="font-bold text-[#2A5A8A]">📸 Galeri Testimoni</h2>
          <span className="text-xs bg-[#D6EEFF] text-[#2A5A8A] px-3 py-1 rounded-full font-bold">
            {loading? "Loading..." : `${data.length} testimoni`}
          </span>
        </div>

        {data.map((item) => (
          <div key={item.id} className="bg-white rounded-[24px] p-3 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <div className="bg-[#D6EEFF] text-[#2A5A8A] text-xs font-black px-3 py-1 rounded-full w-fit">
              #{item.id}
            </div>
            <img src={item.image_url} alt={item.title} className="rounded-[16px] mt-3 w-full" />
            <h3 className="font-black mt-3 text-[#2A5A8A] text-[15px]">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            <p className="text-[11px] text-gray-400 mt-2">
              📅 {new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              <button className="border border-gray-200 rounded-full px-3 py-1.5 text-xs">👍 {item.likes || 2}</button>
              <button className="border border-gray-200 rounded-full px-3 py-1.5 text-xs">❤️ 1</button>
              <button className="border border-gray-200 rounded-full px-3 py-1.5 text-xs">🔥 1</button>
              <button className="border border-gray-200 rounded-full px-3 py-1.5 text-xs">😍 1</button>
            </div>
            <a
              href={`https://wa.me/6282190035576?text=Halo%20Bang%20Rivan,%20mau%20order%20kayak%20testi%20%23${item.id}`}
              target="_blank"
              className="block mt-4 bg-[#E5B44F] text-center py-3 rounded-full font-black text-sm text-[#162040]"
            >
              Hubungi Admin - 082190035576
            </a>
          </div>
        ))}
      </main>
    </div>
  );
  }
