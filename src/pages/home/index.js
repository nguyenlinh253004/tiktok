import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

function Home() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('Wrapper')}>
            <div className={cx('Home')}>
                <div className={cx('Hender')}>
                    <h2>COMPENSATIONS</h2>
                </div>
                <div className={cx('Menu')}>
                    <div>
                        <Link to="/content" className={cx('Content')}>Mức Lương Bổ Sung</Link>
                    </div>

                    <div>Tiền Thưởng Duy Trì</div>
                    <div>Khuyến Khích Nhân Viên</div>
                    <div>Đơn Xin Hưởng Quyền Lợi Nhân Viên</div>
                    <div>Khiếu Nại Về Quyền Lợi Nhân viên</div>
                </div>
            </div>
        </div>
    );
}

export default Home;
