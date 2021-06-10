import cn from "classnames";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStat, getStatUsersId } from "../../../common/selectors";
import { statsActions } from "../statsSlice";
import { useHistory } from "react-router";
import Loading from "../../../components/Loading";
import "./style.scss";

const baseRowsCount = 50;
const basePagesCount = 5;

const StatRow = ({ userId }) => {
  const {
    id,
    first_name,
    last_name,
    email,
    gender,
    ip_address,
    total_clicks,
    total_page_views,
  } = useSelector(getUserStat(userId));
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
  const usersId = useSelector(getStatUsersId);
  const pages = useCallback(() => {
    const pageButtons = [];
    for (let i = pageOffset + 1; i <= pageOffset + basePagesCount; i++) {
      pageButtons.push(
        <button className="stat__page-btn" onClick={setCurrentPage(i)}>
          {i}
        </button>
      );
    }
    return pageButtons;
  }, [pageOffset]);

  useEffect(() => {
    dispatch(statsActions.getStats(-Infinity, baseRowsCount * basePagesCount));
  }, [dispatch]);
  const tableRows = usersId.map((id) => (
    <StatRow userId={id} key={`user-stat-${id}`} />
  ));
  return (
    <section className="stat">
      <table className="stat__table">
        <tr className="stat__header">
          <th width="5%">Id</th>
          <th width="15%">First name</th>
          <th width="10%">Last name</th>
          <th width="20%">Email</th>
          <th width="10%">Gender</th>
          <th width="10%">IP address</th>
          <th width="15%">Total clicks</th>
          <th width="15%">Total page views</th>
        </tr>
        {tableRows.slice(
          (currentPage - 1) * baseRowsCount,
          currentPage * baseRowsCount
        )}
      </table>
      <div className="stat__pagination">{pages()}</div>
      <span
        className="stat__skip-prev"
        disabled={pageOffset === 0}
        onClick={() => setPageOffset(pageOffset - basePagesCount)}
      />
      <span
        className="stat__skip-next"
        disabled={pageOffset === 10}
        onClick={() => setPageOffset(pageOffset + basePagesCount)}
      />
    </section>
  );
};

export default UsersStats;
