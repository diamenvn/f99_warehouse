import React, {
    Component
} from 'react';
import Breadcrumb from '../../master/main/breadcrumb';
import { Button, Tag, Popover, Select, Row, Col, Input, DatePicker, message } from 'antd';
import { AiOutlinePlus, AiOutlineCloseCircle} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";

const { Option } = Select;

class Filter extends Component {
    state = {
        filterBy: 'products',
        filterIs: 'is',
        filterValue: "",
        visibleText: true,
        visibleDate: false,
        textFilterBy: this.props.textFilterBy
    }

    updateFilterBy = e => {
        e == 'date' ? this.setState({ visibleText: false, visibleDate: true }) : this.setState({ visibleText: true, visibleDate: false });
        this.setState({ filterBy: e });
    }

    updateFilterIs = e => {
        this.setState({ filterIs: e });
    }

    updateValue = e => {
        try {
            this.setState({ filterValue: e.target.value });
        } catch (error) {
            let s = new Date(e).toLocaleDateString("vi-VN")
            this.setState({ filterValue: s });
        }
    }

    render() {
        return (
            <div style={{ width: '550px' }}>
                <div className="filter_by_wrapper">
                    <div className="title mb-10">Tìm kiếm theo</div>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={8}>
                            <Select onChange={(e) => { this.updateFilterBy(e) }} defaultValue={this.state.filterBy} className="w-100">
                                {this.state.textFilterBy.map((item, index) => (
                                    <Option key={index} value={item.key}>{item.text}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Select onChange={(e) => { this.updateFilterIs(e) }} defaultValue={this.state.filterIs} className="w-100">
                                <Option value="is">Là</Option>
                                <Option value="equal">Có chứa</Option>
                                <Option value="start">Bắt đầu là</Option>
                                <Option value="end">Kết thúc là</Option>
                                <Option value=">">Lớn hơn</Option>
                                <Option value=">=">Lớn hơn hoặc bằng</Option>
                                <Option value="<">Bé hơn</Option>
                                <Option value="<=">Bé hơn hoặc bằng</Option>
                            </Select>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <Input onChange={e => this.updateValue(e)} value={this.state.filterValue} className={this.state.visibleText ? 'd-block w-100' : 'd-none w-100'} />
                            <DatePicker onChange={e => this.updateValue(e)} className={this.state.visibleDate ? 'd-block w-100' : 'd-none w-100'} />
                        </Col>
                    </Row>
                </div>
                <div className="sort_by_wrapper mt-10">
                    <Button type="primary" className="mr-10" danger onClick={e => this.props.hideFilter(e)}>Hủy</Button>
                    <Button type="primary" onClick={e => this.addFilter(e)} icon={<FaFilter />}>Tìm kiếm</Button>
                </div>
            </div>
        )
    }

    addFilter = function () {
        if (this.state.filterValue == "") {
            message.error("Giá trị tìm kiếm không được để trống");
            return;
        }
        let filterIs = this.state.filterIs.replace("is", 'là').replace('equal', 'có chứa').replace('start', 'bắt đầu là').replace('end', 'kết thúc là');

        this.state.textFilterBy.map((item, index) => {
            if (item.key == this.state.filterBy) {
                this.props.updateFilter(item.text + " " + filterIs + " " + this.state.filterValue, [item.key, this.state.filterIs, this.state.filterValue]);
            }
        });
    }
}

class Header extends Component {
    state = {
        filter: this.props.filter,
        url: "",
        visible: false
    }

    updateFilter = (text, arrayFilter) => {
        let obj = { text: text };

        this.props.updateFilter(obj);
        this.setState({ visible: false });
        this.props.updateDataTable(arrayFilter);
    }

    handleVisibleChange = (visible) => {
        visible ? this.setState({ visible: true }) : this.setState({ visible: false });
    }

    hideFilter = e => {
        this.setState({ visible: false });
    }

    removeFilter = index => {
        console.log(index);
    }

    render() {
        return (
            <section className="buttonaction buttonaction--layout">
                <Breadcrumb>Phân tích và tìm kiếm tệp khách hàng</Breadcrumb>
                <div className="keyword_suggest_wrapper">
                    <div className="keyword__container d-flex align-items-center">
                        <div className="keyword__label">Tiêu chí lọc: </div>
                        <div className="keyword__items d-flex flex-1 mx-20">
                            {this.props.filter.map((item, index) => (
                                <Tag onClose={e => this.removeFilter(index)} color="purple" key={index} closable>{item.text}</Tag>
                            ))}
                            <Popover
                                content={<Filter textFilterBy={this.props.textFilterBy} hideFilter={this.hideFilter} updateFilter={this.updateFilter} filter={this.state.filter} />}
                                title="Thêm điều kiện lọc"
                                trigger="click"
                                placement="bottom"
                                visible={this.state.visible}
                                onVisibleChange={this.handleVisibleChange}
                            >
                                <Button type="primary" className="d-flex align-items-center" size="small" icon={<AiOutlinePlus />}>Thêm điều kiện lọc</Button>
                            </Popover>

                        </div>
                    </div>
                </div>
            </section>
        );
    }
}


export default Header;