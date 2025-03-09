"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface NewsItem {
  id: string;
  image: string;
  title: string;
  date: string;
}

interface NewsGridProps {
  items: NewsItem[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ items }) => {
  const router = useRouter();

  const handleItemClick = (id: string) => {
    router.push(`/news/${id}`);
  };

  const sortedItems = items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 bg-gray-100 rounded-lg shadow-md">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer border border-gray-300 rounded-lg bg-white p-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
          onClick={() => handleItemClick(item.id)}
        >
          <Image
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover rounded-t-lg"
            width={500}
            height={300}
          />
          <div className="p-2">
            <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-blue-700 text-sm">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
