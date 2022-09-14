import React from "react";

export default function sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/admin/dashboard"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">My Menu</div>
        </a>

        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <a className="nav-link" href="/admin/dashboard">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Menu</div>

        <li className="nav-item">
          <a className="nav-link" href="/admin/category">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>Category</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admin/item">
            <i className="fas fa-fw fa-hotel"></i>
            <span>Item</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admin/diskon">
            <i className="fas fa-fw fa-hotel"></i>
            <span>Diskon</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/promo">
            <i className="fas fa-fw fa-hotel"></i>
            <span>Promo</span>
          </a>
        </li>

        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Admin</div>

        <li className="nav-item">
          <a className="nav-link" href="/admin/toko">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>Setting Toko</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admin/user">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>Setting User</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admin/pajak">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>Pajak</span>
          </a>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Stok & History</div>

        <li className="nav-item">
          <a className="nav-link" href="/admin/stok">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>Kelola Stok Menu</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link" href="/admin/histori">
            <i className="fas fa-fw fa-list-alt"></i>
            <span>History Pesanan</span>
          </a>
        </li>

        <hr className="sidebar-divider d-none d-md-block" />

        <div className="text-center d-none d-md-inline">
          <button
            className="rounded-circle border-0"
            id="sidebarToggle"
          ></button>
        </div>
      </ul>
    </>
  );
}
