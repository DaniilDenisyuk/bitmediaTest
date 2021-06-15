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
      valueFormatString: "DD MMM YY",
      tickLength: 15,
      tickThickness: 0,
      lineColor: "#CCCCCC",
      labelFontColor: "#CCCCCC",
      labelFontFamily: "mr",
      scaleBreaks: {
        type: "straight",
        autoCalculate: true,
        collapsibleThreshold: "20%", //change to "50%"
      },
      minimum: XYvalues[0].x,
      maximum: XYvalues[XYvalues.length - 1].x,
    },
    axisY: {
      lineThickness: 0,
      tickLength: 15,
      tickThickness: 0,
      gridColor: "#CCCCCC",
      lineColor: "#CCCCCC",
      labelFontColor: "#CCCCCC",
      labelFontFamily: "mr",
    },
    data: [
      {
        type: "line",
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

const datesAreOnSameDay = (first, second) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

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

  const clickStatsXY = useCallback(() => {
    const statsXY = userStats.map(({ date, clicks }) => ({
      x: new Date(date),
      y: clicks,
    }));
    if (statsXY.length > 0) {
      if (!datesAreOnSameDay(statsXY[0].x, startDate))
        statsXY.unshift({ x: startDate, y: 0 });
      if (!datesAreOnSameDay(statsXY[statsXY.length - 1].x, startDate))
        statsXY.push({ x: endDate, y: 0 });
    } else {
      statsXY.push({ x: startDate, y: 0 });
      statsXY.push({ x: endDate, y: 0 });
    }
    return statsXY;
  }, [userStats, startDate, endDate]);
  const viewsStatsXY = useCallback(() => {
    const statsXY = userStats.map(({ date, page_views }) => ({
      x: new Date(date),
      y: page_views,
    }));
    if (statsXY.length > 0) {
      if (!datesAreOnSameDay(statsXY[0].x, startDate))
        statsXY.unshift({ x: startDate, y: 0 });
      if (!datesAreOnSameDay(statsXY[statsXY.length - 1].x, startDate))
        statsXY.push({ x: endDate, y: 0 });
    } else {
      statsXY.push({ x: startDate, y: 0 });
      statsXY.push({ x: endDate, y: 0 });
    }
    return statsXY;
  }, [userStats, startDate, endDate]);

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
