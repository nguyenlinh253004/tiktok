import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDownWideShort, faEllipsis, faList } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Tippy from '@tippyjs/react';
function Content() {
    const cx = classNames.bind(styles);
    const empLocal = JSON.parse(localStorage.getItem('empLocal'));

    const [local, setLocal] = useState(empLocal || []);

    const handleDelete = (index) => {
        // const isConfirm = confirm('Bạn chắc chắn có muốn xóa không?');
        // if (isConfirm) {
            const setName = local.filter((emp, i) => i !== index);

            setLocal(setName);

            localStorage.setItem('empLocal', JSON.stringify(setName));
        // }
    };

    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Interface')}>
                <div className={cx('Hender')}>
                    <div className={cx('Title')}>Mức Lương Bổ Sung</div>
                    <div className={cx('ADD')}>
                        <Tippy content="Menu" placement="left">
                            <div className={cx('Icon')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </Tippy>
                        <button>
                            <Link to="/add" className={cx('Link-add')}>
                                + Thêm Mức Lương Bổ Sung
                            </Link>
                        </button>
                    </div>
                </div>
                <div className={cx('List')}>
                    <div className={cx('List-input')}>
                        <div className={cx('Input-title')}>
                            <input placeholder="Tên" />
                            <input placeholder="Nhân Viên" />
                            <input placeholder="Phân Lương" />

                            <Tippy content="Xem Danh Sách">
                                <a href="/list" className={cx('List-emloypee')}>
                                    {' '}
                                    <FontAwesomeIcon icon={faList} />
                                </a>
                            </Tippy>
                        </div>
                        <div className={cx('Down')}>
                            <div className={cx('List-icon')}>
                                <FontAwesomeIcon icon={faArrowDownWideShort} />
                            </div>
                            <button>Sửa lần cuối cùng</button>
                        </div>
                    </div>
                    <div className={cx('List-staff')}>
                        <div className={cx('Name')}>
                            <tr>
                                <th>Nhân viên</th>
                                <th>Tên Nhân viên</th>
                                <th>Tên</th>
                                <th>Ngày</th>
                                <th></th>
                            </tr>
                            {local.map((list, index) => (
                                <tr>
                                    <td key={list.ID}>{list.ID}</td>
                                    <td key={list.ID}>{list.NAME}</td>
                                    <td key={list.ID}>{list.CODE}</td>
                                    <td key={list.ID}>{list.DATE}</td>
                                    <td>
                                        <Link to={`/sua/${list.ID}`} className={cx('Edit')}>
                                            <> Sửa</>
                                        </Link>

                                        <span style={{ marginLeft: '10px' }} onClick={() => handleDelete(index)}>
                                            Xóa
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </div>
                    </div>
                    <div className={cx('Page')}>
                        <button>20</button>
                        <button>50</button>
                        <button>70</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
