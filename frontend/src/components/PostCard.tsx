import { Link } from "react-router-dom";

interface Props {
  id: number;
  idea: string;
  author: string;
  date: string;
  imageUrl?: string;
  category?: string;
}

const PostCard = ({ id, idea, author, date, imageUrl, category }: Props) => {
      

  return (
    <li className="relative flex flex-col sm:flex-row xl:flex-col items-start">
      <div className="order-1 sm:ml-6 xl:ml-0">
        <h3 className="mb-1 text-slate-900 font-semibold">
          {category && (
            <span className="mb-1 block text-sm leading-6 text-indigo-500 uppercase">
              {category}
            </span>
          )}
          {idea}
        </h3>
        <div className="prose prose-slate prose-sm text-slate-600">
          <p>
            Publicado por <strong>{author}</strong> el{" "}
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
        <Link
          to={`/post/${id}`}
          className="group inline-flex items-center h-9 rounded-full text-sm font-semibold whitespace-nowrap px-3 focus:outline-none focus:ring-2 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 focus:ring-slate-500 mt-6"
        >
          Leer más
          <svg
            className="overflow-visible ml-3 text-slate-300 group-hover:text-slate-400"
            width="3"
            height="6"
            viewBox="0 0 3 6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M0 0L3 3L0 6" />
          </svg>
        </Link>
      </div>

      {imageUrl && (
        <img
          src={imageUrl}
          alt={idea}
          className="mb-6 shadow-md rounded-lg bg-slate-50 w-full sm:w-[17rem] sm:mb-0 xl:mb-6 xl:w-full object-cover"
         style={{ width: "272px", height: "160px", objectFit: "cover" }}

        />
      )}
    </li>
  );
};

export default PostCard;
