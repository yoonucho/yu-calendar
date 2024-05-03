import DatePicker from "react-datepicker";
import useSetDateStore from "@/stores/useSetDateStore";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/datepicker.module.css";

interface DatePickerBarProps {
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
	onSearch: () => void;
}

export default function DatePickerBar({ startDate, endDate, setStartDate, setEndDate, onSearch }: DatePickerBarProps) {
	const years = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() + i);
	const isRangeSelected = startDate && endDate;
	const isRangeAllSelected = isRangeSelected && startDate !== endDate;

	const handleDaySearch = () => {
		if (startDate && endDate) {
			onSearch();
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	// endDate가 startDate보다 작을 경우 셀렉트박스 비활성화되고 alert창 띄우기
	if (startDate && endDate && startDate > endDate) {
		alert("종료일은 시작일보다 클 수 없습니다.");
		setStartDate(null);
		setEndDate(null);
	}

	const handleReset = () => {
		console.log("handleReset");
		setStartDate(null);
		setEndDate(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputBar}>
				<div>
					<DatePicker
						showIcon
						toggleCalendarOnIconClick
						showYearDropdown
						dateFormatCalendar="MMMM"
						scrollableYearDropdown
						yearDropdownItemNumber={15}
						dateFormat="yyyy.MM.dd"
						selected={startDate}
						onChange={date => {
							setStartDate(date);
						}}
						dropdownMode="select"
						selectsStart
						startDate={startDate}
						endDate={endDate}
						locale={ko}
						renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
							<div className={styles.customHeader}>
								<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<select value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
									{years.map(option => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<span>{getMonth(date) + 1}월</span>
								<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						)}
					/>
					<DatePicker
						showIcon
						toggleCalendarOnIconClick
						showYearDropdown
						dateFormatCalendar="MMMM"
						scrollableYearDropdown
						yearDropdownItemNumber={15}
						dateFormat="yyyy.MM.dd"
						selected={endDate}
						onChange={date => {
							setEndDate(date);
						}}
						dropdownMode="select"
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						locale={ko}
						renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
							<div className={styles.customHeader}>
								<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
									<FontAwesomeIcon icon={faChevronLeft} />
								</button>
								<select value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
									{years.map(option => (
										<option key={option} value={option}>
											{option}
										</option>
									))}
								</select>
								<span>{getMonth(date) + 1}월</span>
								<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
									<FontAwesomeIcon icon={faChevronRight} />
								</button>
							</div>
						)}
					/>
				</div>
				<div className={styles.btnContainer}>
					<button className={isRangeAllSelected ? styles.btnActive : styles.searchBtn} onClick={handleDaySearch}>
						날짜 검색하기
					</button>
					<button className={isRangeSelected ? styles.btnActive : styles.resetBtn} onClick={handleReset}>
						날짜 초기화하기
					</button>
				</div>
			</div>
		</div>
	);
}
