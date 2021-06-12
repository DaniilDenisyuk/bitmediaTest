import cn from "classnames";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatsUser, getStatsUsersId } from "../../../common/selectors";
import { useHistory } from "react-router";
import Loading from "../../../components/Loading";
import "./style.scss";

const baseRowsCount = 50;
const basePagesCount = 5;

const UserRow = ({ userId }) => {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    ip_address,
    total_clicks,
    total_page_views,
  } = useSelector(getStatsUser(userId));
  const history = useHistory();
  return (
    <tr className="stat__row" onClick={() => history.push(`/stats/user/${id}`)}>
      <td>{id}</td>
      <td>{first_name}</td>
      <td>{last_name}</td>
      <td>{email}</td>
      <td>{gender}</td>
      <td>{ip_address}</td>
      <td>{total_clicks}</td>
      <td>{total_page_views}</td>
    </tr>
  );
};

const UsersStats = ({ className }) => {
  const dispatch = useDispatch();
  const [pageOffset, setPageOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersId = useSelector(getStatsUsersId);
  const lastPage = 1 + Math.floor(usersId.length / baseRowsCount);
  const pageButtons = [];
  for (let i = pageOffset * basePagesCount + 1; i < lastPage; i++) {
    pageButtons.push(
      <button
        key={`page-${i}`}
        disabled={currentPage === i}
        className="stat__page-btn"
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    );
  }
  const tableRows = usersId.map((id) => (
    <UserRow userId={id} key={`user-stat-${id}`} />
  ));
  return (
    <section className="stat __container">
      <p className="page-heading">Users statistics</p>
      <table className="stat__table ">
        <tr className="stat__header">
          <th width="5.5%">Id</th>
          <th width="12%">First name</th>
          <th width="13%">Last name</th>
          <th width="">Email</th>
          <th width="10%">Gender</th>
          <th width="14%">IP address</th>
          <th width="12%">Total clicks</th>
          <th width="12%">Total page views</th>
        </tr>
        {tableRows.slice(
          (currentPage - 1) * baseRowsCount,
          currentPage * baseRowsCount
        )}
      </table>
      <div className="stat__pagination">
        <span
          className={cn("stat__skip-prev nav-arrow nav-arrow--left", {
            "nav-arrow--disabled": pageOffset === 0,
          })}
          onClick={() => {
            if (pageOffset > 0) setPageOffset(pageOffset - 1);
          }}
        />
        {pageButtons}
        <span
          className={cn("stat__skip-next nav-arrow nav-arrow--right", {
            "nav-arrow--disabled":
              (pageOffset + 1) * basePagesCount >= lastPage,
          })}
          onClick={() => {
            if (!((pageOffset + 1) * basePagesCount >= lastPage))
              setPageOffset(pageOffset + 1);
          }}
        />
      </div>
    </section>
  );
};

export default UsersStats;
