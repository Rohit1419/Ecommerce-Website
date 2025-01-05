import Link from "next/link";


interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
//   onPageChange: (page: number) => void;
}

export default function PaginationBar({currentPage, totalPages}: PaginationBarProps) {
    const maxPage = Math.min(totalPages, Math.max(currentPage + 2, totalPages));
    const minPage = Math.max(1, Math.min(currentPage - 2, maxPage - 4));
    

  const numberedPages = Array.from({ length: maxPage - minPage + 1 }, (_, i) => {
    const page = minPage + i;
    return (
      <Link 
        href={`?page=${page}`}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>
    );
  });

  return (
    <>
    <div className="join hidden sm:block  ">{numberedPages}</div>
    
    <div className="join block sm:hidden" >
      {currentPage> 1 && (
        <Link href= {"?page" + (currentPage -1) } className="brn join-item" >
          «
          </Link>
      )}
          <button className="join-item btn pointer-events-none " >
              Page {currentPage}
          </button>
      {currentPage < totalPages && (
            <Link href={"?page" + (currentPage + 1) } className="btn join-item" >
              »
            </Link>
          )}
      

          
      
    </div>
    


  </>
  );

}