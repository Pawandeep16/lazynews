import React from "react";
import { useLocation } from "react-router-dom";

function BreakingPage() {
  const location = useLocation();
  const { news } = location.state || { news: [] };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Top Breaking News</h1>
      {news.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {news.map((article, index) => (
            <div key={index} className="border p-4 rounded-md shadow-md">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-2">{article.description}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No breaking news available at the moment.</p>
      )}
    </div>
  );
}

export default BreakingPage;
