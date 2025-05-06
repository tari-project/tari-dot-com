import { DotDotDot, PageButton, PageNumber, PageNumbers, Wrapper } from './styles';

interface Props {
    currentPage: number;
    totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('ellipsis');
                pageNumbers.push(currentPage - 1);
                pageNumbers.push(currentPage);
                pageNumbers.push(currentPage + 1);
                pageNumbers.push('ellipsis');
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <Wrapper>
            {currentPage > 1 && <PageButton href={`/lessons?page=${currentPage - 1}`}>Previous</PageButton>}

            <PageNumbers>
                {getPageNumbers().map((page, index) =>
                    page === 'ellipsis' ? (
                        <DotDotDot key={`ellipsis-${index}`}>...</DotDotDot>
                    ) : (
                        <PageNumber key={page} href={`/lessons?page=${page}`} $active={page === currentPage}>
                            {page}
                        </PageNumber>
                    )
                )}
            </PageNumbers>

            {currentPage < totalPages && <PageButton href={`/lessons?page=${currentPage + 1}`}>Next</PageButton>}
        </Wrapper>
    );
}
