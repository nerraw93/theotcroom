import React, {Component} from "react";
import PropTypes from "prop-types";
import cx from "classnames";

class Tabs extends Component {
  render() {
    const { title, subtitle, tabs, selected, onClick } = this.props;

    return (
      <div className="tabs-wrapper">
        <h4>{title}</h4>
        <p>{subtitle}</p>
        <div className="tabs">
          {
            tabs.map((t, index) => {
              return (
                <span key={index}>
                  <a
                    className={cx("tab-item", selected === t.name && "selected")}
                    onClick={() => onClick(t.name)}>
                    {t.display_name}
                  </a>
                </span>
              )
            })
          }
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  tabs: PropTypes.array.isRequired,
  selected: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Tabs;
