import React from "react";
import "./Sidebar.css";
import logo from "../../assests/images/logo/Logo2.png";
import { Link } from "react-router-dom";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar">
        <Link to="/">
          <img src={logo} alt="One Store" />
        </Link>
        <Link to="/admin/dashboard">
          <p>
            <DashboardIcon /> Dashboard
          </p>
        </Link>
        <Link>
          <SimpleTreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ImportExportIcon />}
          >
            <TreeItem itemId="1" label="Products">
              <Link to="/admin/products">
                <TreeItem itemId="2" label="All" icon={<PostAddIcon />} />
              </Link>

              <Link to="/admin/product">
                <TreeItem itemId="5" label="Create" icon={<AddIcon />} />
              </Link>
            </TreeItem>
          </SimpleTreeView>
        </Link>

        <Link to="/admin/orders">
          <p>
            <ListAltIcon /> Orders
          </p>
        </Link>

        <Link to="/admin/users">
          <p>
            <PeopleIcon /> Users
          </p>
        </Link>

        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon /> Reviews
          </p>
        </Link>
      </div>
    </>
  );
};

export default Sidebar;
