

export default function MenuPagination({paginationGrid, setPaginationGrid})
{
    return(
    <select
    className="custom-btn btn-2"
    value={paginationGrid}
    onChange={(e) => setPaginationGrid(e.target.value)}
    >
    <option value="10">10</option>
    <option value="20">20</option>
    <option value="50">50</option>
    <option value="100">100</option>
    <option value="250">250</option>
    <option value="500">500</option>
    <option value="1000">1000</option>
    <option value="2500">2500</option>
    <option value="5000">5000</option>
    </select>);
}

