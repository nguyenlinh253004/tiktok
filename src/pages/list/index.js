import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './List.module.scss';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { faHome } from '@fortawesome/free-solid-svg-icons';
function List() {
    const cx = classNames.bind(style);
    const empLocal = JSON.parse(localStorage.getItem('empLocal'));
    const [list] = useState(empLocal || []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('List')}>
                <div className={cx('header')}>
                    <a href="/content">
                        <FontAwesomeIcon icon={faHome} className={cx('icon')} />
                    </a>
                    <h2>Danh Sách Mức Lương Bổ Sung</h2>
                </div>
                <tr>
                    <th>Mã nhân viên</th>
                    <th>Tên nhân viên</th>
                    <th>Nhân viên</th>
                    <th>Công ty</th>
                    <th>Phần lương</th>
                    <th>Số tiền</th>
                    <th>Ngày</th>
                </tr>
                {list.map((lis) => (
                    <tr>
                        <td key={lis.ID}>{lis.ID}</td>
                        <td key={lis.ID}>{lis.NAME}</td>
                        <td key={lis.ID}>{lis.CODE}</td>
                        <td key={lis.ID}>Công Ty M-offer</td>
                        <td key={lis.ID}>{lis.rose}</td>
                        <td key={lis.ID}>{lis.monney}</td>
                        <td key={lis.ID}>{lis.DATE}</td>
                    </tr>
                ))}
            </div>
        </div>
    );
}

export default List;
