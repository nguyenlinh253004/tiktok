import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './Sua.module.scss';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Sua() {
    const cx = classNames.bind(styles);
    const { ID } = useParams();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [rose, setRose] = useState('');
    const selectOption = ['Hoa Hồng', 'Tiền Thưởng', 'Tăng Ca', 'Tiền Bổ Sung'];

    const [employee, setEmployee] = useState({
        ID: '',
        NAME: '',
        CODE: '',
        monney: '',
        DATE: '',
        rose: '',
    });

    useEffect(() => {
        const empLocal = JSON.parse(localStorage.getItem('empLocal')) || [];
        const empData = empLocal.find((emp) => emp.ID === ID);
        if (empData) {
            setEmployee(empData);
            setStartDate(new Date(empData.DATE)); // Set the saved date
            setRose(empData.rose); // Set the saved rose value
        }
    }, [ID]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({ ...prev, [name]: value }));
    };

    const [errors, setErrors] = useState({});

    const validateFields = () => {
        const newErrors = {};
        if (!rose) newErrors.rose = 'Vui lòng nhập trường này';
        if (!startDate) newErrors.startDate = 'Vui lòng nhập trường này';
        if (!employee.monney) newErrors.monney = 'Vui lòng nhập trường này';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validateFields()) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        const empLocal = JSON.parse(localStorage.getItem('empLocal')) || [];
        const updatedData = empLocal.map((emp) =>
            emp.ID === ID ? { ...employee, DATE: startDate.toISOString(), rose } : emp,
        );
        localStorage.setItem('empLocal', JSON.stringify(updatedData));
        alert('Thay Đổi Thành Công');
        navigate('/content');
    };

    const handleRose = (sel) => {
        setRose(sel);
        setEmployee((prev) => ({ ...prev, rose: sel }));
        setShow(false);
    };

    const [isDatePickerVisible, setDatePickerVisible] = useState(false);

    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Inner')}>
                <div className={cx('Hender')}>
                    <div>Thông Tin Mức Lương Bổ Sung</div>
                    <button onClick={handleSave}>Lưu Thay Đổi</button>
                    <button onClick={() => navigate('/content')} style={{ color: 'white', backgroundColor: '#ef2424' }}>
                        Hủy Thay Đổi
                    </button>
                </div>
                <div className={cx('Info')}>
                    <div className={cx('Wrapper-info')}>
                        <div className={cx('Info-staff')}>Thông Tin Cá Nhân</div>
                        <div className={cx('Inner-Number')}>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Mã Số *</div>
                                <input
                                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                                    type="text"
                                    name="CODE"
                                    value={employee.CODE}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Công Ty *</div>
                                <input type="text" value="Công Ty M-offer" readOnly />
                            </div>
                        </div>
                        <div className={cx('Number-CD', 'Number-CDD')}>
                            <div>
                                <div className={cx('Number')}>Tên Nhân viên *</div>
                                <input
                                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                                    type="text"
                                    name="NAME"
                                    value={employee.NAME}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div>
                                <div className={cx('Number')}>Nhân viên *</div>
                                <input
                                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                                    type="text"
                                    name="ID"
                                    value={employee.ID}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('Wrapper-info')}>
                        <div className={cx('Info-staff')}>Thông Tin Tiền Lương</div>
                        <div className={cx('Inner-Number')}>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Phần lương *</div>
                                <Tippy
                                    visible={show}
                                    interactive
                                    placement="bottom"
                                    onClickOutside={() => setShow(false)}
                                    render={(attrs) => (
                                        <div
                                            style={{
                                                display: show ? 'block' : 'none',
                                            }}
                                            className={cx('serchResutl')}
                                            tabIndex="-1"
                                            {...attrs}
                                        >
                                            {selectOption.map((sel, i) => (
                                                <h5 key={i} onMouseDown={() => handleRose(sel)}>
                                                    {sel}
                                                </h5>
                                            ))}
                                        </div>
                                    )}
                                >
                                    <input
                                        type="text"
                                        name="rose"
                                        onFocus={() => setShow(true)}
                                        value={rose}
                                        readOnly
                                    />
                                </Tippy>
                                {errors.rose && <p className={cx('error')}>{errors.rose}</p>}
                            </div>
                            <div className={cx('Number-CD')}>
                                <div className={cx('Number')}>Ngày tính lương *</div>
                                <Tippy
                                    interactive
                                    placement="bottom"
                                    visible={isDatePickerVisible}
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

                                                    setEmployee((prev) => ({
                                                        ...prev,
                                                        DATE: date.toISOString(),
                                                    }));

                                                    setDatePickerVisible(false);
                                                }}
                                                inline
                                            />
                                        </div>
                                    )}
                                    onClickOutside={() => setDatePickerVisible(false)}
                                >
                                    <input
                                        type="text"
                                        onFocus={() => setDatePickerVisible(true)}
                                        value={startDate ? startDate.toLocaleDateString() : ''}
                                        readOnly
                                    />
                                </Tippy>
                                {errors.startDate && <p className={cx('error')}>{errors.startDate}</p>}
                            </div>
                        </div>
                        <div className={cx('Number-CD')}>
                            <div className={cx('Number')}>Số tiền *</div>
                            <input type="number" name="monney" value={employee.monney} onChange={handleChange} />
                            {errors.monney && <p className={cx('error')}>{errors.monney}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sua;
