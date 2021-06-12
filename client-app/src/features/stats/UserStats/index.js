import cn from "classnames";
import { CanvasJSChart } from "canvasjs-react-charts";
import DatePicker from "react-datepicker";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStatsUserStats, getStatsUserName } from "../../../common/selectors";
import { statsActions } from "../statsSlice";
import { useParams } from "react-router";
import Loading from "../../../components/Loading";

import "react-datepicker/dist/react-datepicker.css";
import "./style.scss";

const UserChart = ({ className, title, XYvalues }) => {
  const options = {
    animationEnabled: true,
    axisX: {
      valueFormatString: "DD MMM",
      tickLength: 15,
      tickThickness: 0,
      labelFontColor: "#CCCCCC",
      labelFontFamily: "mr",
    },
    axisY: {
      lineThickness: 0,
      tickLength: 15,
      tickThickness: 0,
      labelFontColor: "#CCCCCC",
      labelFontFamily: "mr",
    },
    data: [
      {
        type: "spline",
        dataPoints: XYvalues,
      },
    ],
  };
  return (
    <div className={cn(className, "chart")}>
      <p className="chart__heading">{title}</p>
      <CanvasJSChart options={options} />
    </div>
  );
};

const convertDate = (dateObject) => {
  const [, mmm, , yyyy] = dateObject.toDateString().split(" ");
  return `${mmm} ${dateObject.getDate()}, ${yyyy}`;
};
const UserStats = ({ className }) => {
  const { id } = useParams();
  const name = useSelector(getStatsUserName(id));
  const userStats = useSelector(getStatsUserStats(id));
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [filterOpened, setFilterOpened] = useState(false);

  const clickStatsXY = useCallback(
    () =>
      userStats.map(({ date, clicks }) => ({
        x: new Date(date),
        y: clicks,
      })),
    [userStats]
  );
  const viewsStatsXY = useCallback(
    () =>
      userStats.map(({ date, page_views }) => ({
        x: new Date(date),
        y: page_views,
      })),
    [userStats]
  );
  console.log(viewsStatsXY());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      statsActions.getUserStats(id, startDate.getTime(), endDate.getTime())
    );
  }, [id, startDate, endDate, dispatch]);

  return (
    <section className="user-stats __container">
      <div className="row">
        <p className="page-heading">{name}</p>
        <div className="user-stats__date-filter date-filter">
          <p>Select date range</p>
          <div
            className="date-filter__selected"
            onClick={() => setFilterOpened(!filterOpened)}
          >
            {convertDate(startDate)} - {convertDate(endDate)}
          </div>
          {filterOpened && (
            <div className="date-filter__wrapper">
              <DatePicker
                className="date-filter__picker"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <DatePicker
                className="date-filter__picker"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                onClickOutside={() => setFilterOpened(false)}
                onSelect={() => setFilterOpened(false)}
              />
            </div>
          )}
        </div>
      </div>
      <UserChart
        className="user-stats__chart"
        title="Clicks"
        XYvalues={clickStatsXY()}
      />
      <UserChart
        className="user-stats__chart"
        title="Views"
        XYvalues={viewsStatsXY()}
      />
    </section>
  );
};

export default UserStats;
