import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

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

  const sortedItems = items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 p-5 m-5 bg-gray-100 rounded-lg shadow-md">
      {sortedItems.map((item) => (
        <div
          key={item.id}
          className="border border-gray-300 rounded-lg p-5 bg-white transition-transform duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg"
          onClick={() => handleItemClick(item.id)}
        >
          <Image
            src={item.image}
            alt={item.title}
            className="w-full h-40 object-cover rounded-t-lg"
            layout="responsive"
            width={500}
            height={300}
          />
          <div className="news-content">
            <h3 className="text-lg font-bold text-gray-800 my-2">{item.title}</h3>
            <p className="text-darkred">{item.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsGrid;
