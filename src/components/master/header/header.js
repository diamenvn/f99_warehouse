import React, {
    Component
} from 'react';
import './header.sass';
import { AiOutlineSearch, AiOutlineUnorderedList } from 'react-icons/ai';
import { TiArrowRightOutline } from 'react-icons/ti';
import { MdNotifications } from 'react-icons/md';
import { Badge, Popover } from 'antd';
import Logo from '../../../storages/svg/logo.svg';
import Cookies from 'js-cookie'

let token = Cookies.get('_session') ? JSON.parse(Cookies.get('_session')) : "";

const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );


class Header extends Component {
    render() {
        return (
            <header className="header header--layout">
                <div className="header__pd-safe">
                    <div className="container">
                        <div className="row">
                            <div className="col-8">
                                <div className="d-flex">
                                    <div className="logo logo--layout d-flex align-items-center header__item co-white fs-30 fw-bold">
                                        <img alt="logo" src={Logo} />
                                        <span className="fs-16">NHÂN SỰ</span>
                                    </div>
                                    <div className="icon__open_list co-white flex-center header__item fs-20">
                                        <AiOutlineUnorderedList className="icon--hover" />
                                    </div>
                                    <div className="search search--layout header__item p-relative">
                                        <input name="" className="fs-20 h-100" placeholder="Tìm kiếm nhanh..." />
                                        <div className="p-absolute icon-search">
                                            <AiOutlineSearch />
                                        </div>
                                        <div className="p-absolute icon-entry">
                                            <TiArrowRightOutline className="icon--hover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="d-flex justify-content-end h-100">
                                    <div className="icon__notify icon__notify--layout flex-center co-default px-10">
                                        <Popover content={content} title="Thông báo">
                                            <Badge count={0} showZero>
                                                <MdNotifications className="fs-25 icon--hover" />
                                            </Badge>
                                        </Popover>
                                    </div>
                                    <div className="header__profile header__profile--layout flex-center">
                                        <div className="profile--layout">
                                            <div className="profile_avatar flex-center">
                                                <span className="fs-20 co-black fw-bold">N</span>
                                            </div>
                                        </div>
                                        <div className="profile--layout">
                                            <div className="profile_name flex-center co-white fw-bold hover--bg">
                                                {token.name}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default Header;