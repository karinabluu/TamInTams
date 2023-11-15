import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getToken, getUuid } from '../../util/token';
import { fetchReservationHistory, deleteReservation } from '../../service/api';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [showNotice, setShowNotice] = useState(false);
  const [showMyPageModal, setShowMyPageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [deletedReservationIds, setDeletedReservationIds] = useState([]);
  const [reservations, setReservations] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);
  const closeSidebar = () => setSidebar(false);

  const openNotice = () => {
    setShowNotice(true);
  };

  const closeNotice = () => {
    setShowNotice(false);
    setSidebar(false);
  };

  const openMyPageModal = () => {
    setShowMyPageModal(true);
  };

  const closeMyPageModal = () => {
    setShowMyPageModal(false);
    setSidebar(false);
  };

  const handleMenuItemClick = (item) => {
    if (item.modal) {
      if (item.title === '공지사항') {
        openNotice();
      } else if (item.title === '나의 예약정보') {
        openMyPageModal();
      }
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    const id = getUuid();
    if (!token || !id) {
      navigate('/');
    }
  }, [navigate]);

  const userName = localStorage.getItem('userName');

  const loadReservations = async () => {
    setLoading(true);
    try {
      const _id = localStorage.getItem('reservationId');
      const token = getToken();
      if (_id && token) {
        const response = await fetchReservationHistory(_id, token);
        const reservationData = Array.isArray(response) ? response : [response];
        const filteredReservations = reservationData.filter(
          (reservation) => !deletedReservationIds.includes(reservation._id)
        );
        setReservations(filteredReservations);
      }
    } catch (err) {
      // 404 에러 발생 시 '예약 내역이 없습니다' 메시지 표시
      if (err.response && err.response.status === 404) {
        setReservations([]); // 예약 목록을 비웁니다.
      } else {
        setError(err.message); // 다른 종류의 에러 메시지 설정
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReservations();
  }, []);

  const handleDelete = async (reservationId) => {
    const confirmCancel = window.confirm('예약을 정말 취소하시겠습니까?');
    if (confirmCancel) {
      try {
        const token = getToken();
        const deletedId = await deleteReservation(reservationId, token);
        if (deletedId) {
          const updatedReservations = reservations.filter(
            (reservation) => reservation._id !== deletedId
          );
          setReservations(updatedReservations);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Link to="#" className="menu-button">
        <FaIcons.FaBars onClick={showSidebar} />
      </Link>
      <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
        <ul className="nav-menu-width">
          <li className="navbar-toggle">
            <Link to="#" className="menu-button">
              <AiIcons.AiOutlineClose onClick={closeSidebar} />
            </Link>
          </li>
          {SidebarData.map((item, index) => (
            <li key={index} className={item.cName}>
              <Link to={item.path} onClick={() => handleMenuItemClick(item)}>
                <div className="Space">{item.icon}</div>
                <span>{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {sidebar && <div className="Dark"></div>}
      {showNotice && (
        <div className="black-square">
          <span className="notice-title">공지사항</span>
          <div className="white-square">
            <Notice />
            <button onClick={closeNotice} className="close-button">
              네, 모두 읽고 확인하였습니다.
            </button>
          </div>
        </div>
      )}
      {showMyPageModal && (
        <div className="black-square2">
          <span className="mypage-title">회의실 예약</span>
          <div className="white-square2">
            {reservations.length === 0 ? (
              <p>예약 내역이 없습니다.</p>
            ) : (
              <ul>
                {Array.isArray(reservations) &&
                  reservations.map((reservation) => (
                    <li key={reservation._id}>
                      <div>예약자명: {userName}</div>
                      <div>회의실명: {reservation.roomId}</div>
                      <div>예약날짜: {reservation.bookDate}</div>
                      <div>예약시간: {reservation.bookTime}</div>
                      <button onClick={() => handleDelete(reservation._id)}>
                        삭제
                      </button>
                    </li>
                  ))}
              </ul>
            )}
            <button onClick={closeMyPageModal} className="close-button">
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

const Notice = styled.div`
  background-image: url('/img/notice.png');
  background-repeat: no-repeat;
  background-size: contain;
  padding: 350px;
  margin-top: 30px;
`;

export default Navbar;
