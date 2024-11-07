import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useNavigate } from 'react-router-dom';
import styles from './Add.module.scss';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function Add() {
    const cx = classNames.bind(styles);
    const [result, setResult] = useState([]);
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(null); // Ngày chọn
    const navigate = useNavigate();
    // phần lương
    const [rose, setRosi] = useState('');
    const selectOption = ['Hoa Hồng', 'Tiền Thưởng', 'Tăng Ca', 'Tiền Bổ Sung'];
    const handleRose = (sel) => {
        setRosi(sel);
    };
    // tiền

    //sevalocal

    const savedData = JSON.parse(localStorage.getItem('empLocal')); // Cập nhật employeeData từ localStorage

    const [employeeDate, setEmloyeeDate] = useState(savedData || []);

    // chọn
    const arrData = [
        {
            id: 'HR-EMP-00001',
            name: 'Ngô Xuân trường',
            code: 'HR-ADS-YY-MM',
        },
        {
            id: 'HR-EMP-00002',
            name: 'Lê Thanh Tùng',
            code: 'HR-ACS-YY-MM',
        },
        {
            id: 'HR-EMP-00003',
            name: 'Nguyễn Quang Linh',
            code: 'HR-ABS-YY-MM',
        },
        {
            id: 'HR-EMP-00004',
            name: 'Nguyễn Trọng Dương',
            code: 'HR-ASC-YY-MM',
        },
        {
            id: 'HR-EMP-00005',
            name: 'Đặng Minh Vũ',
            code: 'HR-IDS-YY-MM',
        },
    ];
    const [select, setSelect] = useState(arrData[0]);

    const [errors, setErrors] = useState({});
    const validateFields = () => {
        const newErrors = {};

        if (!rose) newErrors.rose = 'Vui lòng nhập trường này';
        if (!startDate) newErrors.startDate = 'Vui lòng nhập trường này';
        if (!monney) newErrors.monney = 'Vui lòng nhập trường này';
        if (monney <= 0 && monney) newErrors.monney = 'Số tiền phải lớn hơn 0';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const [monney, setMonney] = useState('');
    const handleMonney = (e) => {
        setMonney(e.target.value);
    };

    const hanldSave = () => {
        if (!validateFields()) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const newEmployee = {
            ID: select.id,
            NAME: select.name,
            CODE: select.code,
            rose,
            DATE: startDate ? startDate.toLocaleDateString() : '',
            monney,
        };
        const updatedData = [...employeeDate, newEmployee];
        setEmloyeeDate(updatedData); // Cập nhật state

        // Lưu vào localStorage
        localStorage.setItem('empLocal', JSON.stringify(updatedData));

        alert('Lưu Thành Công');
        navigate('/content');
    };

    const handleSelect = (e) => {
        const eventId = e.target.value;
        const employeeId = arrData.find((emp) => emp.id === eventId);
        setSelect(employeeId);
    };

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setResult([1, 2, 3, 4, 5]);
        }, 2000);
    }, []);
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Inner')}>
                <div className={cx('Hender')}>
                    <div>Thêm Mức Lương Bổ Sung</div>

                    <button onClick={hanldSave}>Lưu</button>
                </div>
                <div className={cx('Info')}>
                    <div className={cx('Wrapper-info')}>
                        <div className={cx('Info-staff')}>Thông Tin Cá Nhân</div>
                        <div className={cx('Inner-Number')}>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Mã Số *</div>
                                <select onChange={handleSelect}>
                                    {arrData.map((emp) => (
                                        <option key={emp.id} value={emp.id}>
                                            {emp.code}
                                        </option>
                                    ))}
                                </select>
                                {errors.select && <p className={cx('error')}>{errors.select}</p>}
                            </div>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Công Ty *</div>
                                <input type="text" value="Công Ty M-offer" />
                            </div>
                        </div>
                        <div className={cx('Number-CD', 'Number-CDD')}>
                            <wrapper>
                                <div className={cx('Number')}>Tên Nhân viên *</div>
                                <input type="text" value={select.name} />
                            </wrapper>
                            <wrapper>
                                <div className={cx('Number')}>Nhân viên *</div>
                                <input type="text" min="0" max="100" step="1" value={select.id} tabIndex="-1" />
                            </wrapper>
                        </div>
                    </div>
                    <div className={cx('Wrapper-info')}>
                        <div className={cx('Info-staff')}>Thông Tin Tiền Lương</div>
                        <div className={cx('Inner-Number')}>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Phần lương *</div>
                                <Tippy
                                    visible={show && result.length > 0}
                                    interactive
                                    placement="bottom"
                                    render={(arrts) => {
                                        return (
                                            <div
                                                className={cx('serchResutl')}
                                                style={{
                                                    display: show ? 'block' : 'none',
                                                }}
                                                tabIndex="-1"
                                                {...arrts}
                                            >
                                                {selectOption.map((sel, i) => (
                                                    <h5 key={i} onMouseDown={() => handleRose(sel)}>
                                                        {sel}
                                                    </h5>
                                                ))}
                                            </div>
                                        );
                                    }}
                                    onClickOutside={() => setShow(false)}
                                >
                                    <input
                                        type="text"
                                        onFocus={() => setShow(true)}
                                        onBlur={() => setShow(false)}
                                        value={rose}
                                    />
                                </Tippy>
                                {errors.rose && <p className={cx('error')}>{errors.rose}</p>}
                            </div>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Ngày tính lương *</div>

                                <Tippy
                                    interactive={true}
                                    placement="bottom"
                                    visible={isDatePickerVisible}
                                    // onClickOutside={() => setDatePickerVisible(false)} // Ẩn khi nhấp ra ngoài
                                    render={(attrs) => (
                                        <div
                                            className={cx('Date')}
                                            style={{
                                                display: isDatePickerVisible ? 'block' : 'none', // Kiểm soát hiển thị với display
                                            }}
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            <DatePicker
                                                selected={startDate}
                                                onChange={(date) => {
                                                    setStartDate(date);
                                                    setDatePickerVisible(false); // Ẩn khi người dùng chọn ngày
                                                }}
                                                inline
                                            />
                                        </div>
                                    )}
                                >
                                    <input
                                        type="type"
                                        onFocus={() => setDatePickerVisible(true)} // Hiển thị Tippy khi input được focus
                                        value={startDate ? startDate.toLocaleDateString() : ''}
                                    />
                                </Tippy>
                                {errors.startDate && <p className={cx('error')}>{errors.startDate}</p>}
                            </div>
                        </div>
                        <div className={cx('Number-CD')}>
                            <div className={cx('Number')}>Số tiền *</div>
                            <input value={monney} type="number" onChange={handleMonney} />
                            {errors.monney && <p className={cx('error')}>{errors.monney}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Add;
