import React, { Component } from 'react';
import axios from "axios";
import prefixUrl from "../constant/prefix-url";
import PageHeader from './contents/headers/PageHeader';
import MoviesSectionContainer from './contents/section/movies-section/MoviesSectionContainer';
import queryString from "query-string"; // TODO: allow to get params from url
import MovieFilterContainer from './contents/movie-filter/MovieFilterContainer';
import { Dialog } from "@material-ui/core";
import MultiSelectModelForm from './modals/MultiSelectModalForm';
import { connect } from "react-redux";
import { updateModelsFilterAct, updateTagsFilterAct, resetFilterAct } from "../actions/filterMovies.action";
import StudioPickerModal from './modals/StudioPickerModal';
import Pagination from './pagination/Pagination';

class Movies extends Component {
    constructor(props) {
        super(props);
        const params = queryString.parse(this.props.location.search);
        const page = parseInt(params.page);

        this.state = {
            size: 20,
            openModal: false,
            filterType: 'TAGS',
            suggestions: [],
            page: page ? page : 1
        }
    }

    handleOpenModal = (type) => {
        this.setState({
            openModal: true,
            filterType: type
        })
    }

    handleCloseModal = () => {
        this.setState({ openModal: false })
    }

    componentDidMount() {
        const { page } = this.state;
        document.title = "Movie list - page " + (page);
        axios(`${prefixUrl}/movies/size`)
            .then(size => {
                this.setState({ size: size.data })
            })
            .catch(console.log);
    }

    onChangeInput = (val) => {
        const { filterType: type } = this.state;
        if (val.trim() !== '') {
            switch (type) {
                case 'MODELS':
                    axios(`${prefixUrl}/models/find-by-name?name=${val}`)
                        .then(models => {
                            this.setState({ suggestions: models.data.map(model => ({ title: model.name, value: model.id })) })
                        })
                    break;
                default:
                    axios(`${prefixUrl}/tags/find-tags?tagName=${val}`)
                        .then(tags => {
                            this.setState({ suggestions: tags.data.map(tag => ({ title: tag, value: tag })) })
                        })
                    break;
            }
        }
    }

    updateFilterItems = (selectedArr) => {
        const { filterType } = this.state;
        switch (filterType) {
            case 'MODELS':
                this.props.updateModelsFitler(selectedArr);
                break;
            default:
                this.props.updateTagsFilter(selectedArr.map(item => item.value));
        }
    }

    componentWillUnmount() {
        this.props.resetFilter();
    }

    handleChangePage = (page) => {
        this.setState({ page: page })
        this.props.history.push(`/movies/all?page=${page}`);
    }


    renderModal = () => {
        const { filterType, suggestions } = this.state;
        const { filterModels, filterTags } = this.props;
        switch (filterType) {
            case 'MODELS':
                return <MultiSelectModelForm closeModal={this.handleCloseModal}
                    suggestions={suggestions}
                    selected={filterModels}
                    title={filterType}
                    onChangeInput={this.onChangeInput}
                    onSelectItem={this.updateFilterItems}
                    onRemoveItem={this.updateFilterItems}
                    onSubmit={() => this.handleCloseModal()} />
            case 'STUDIOS':
                return <StudioPickerModal closeModal={this.handleCloseModal} />
            default:
                return <MultiSelectModelForm closeModal={this.handleCloseModal}
                    suggestions={suggestions}
                    selected={filterTags.map(tag => ({ title: tag, value: tag }))}
                    title={filterType}
                    onChangeInput={this.onChangeInput}
                    onSelectItem={this.updateFilterItems}
                    onRemoveItem={this.updateFilterItems}
                    onSubmit={() => this.handleCloseModal()} />
        }
    }

    render() {
        const { openModal, size, page } = this.state;
        return (
            <div>
                <PageHeader title="Movies" history={this.props.history} ></PageHeader>
                <MovieFilterContainer handleOpenModal={this.handleOpenModal} />
                <div className="movies-container" style={{ marginTop: "30px" }}>
                    <MoviesSectionContainer numberOfMovies={20} page={page} />
                    <Pagination size={size} currentPage={page} onChangePage={this.handleChangePage} />
                </div>
                <Dialog open={openModal} onClose={this.handleCloseModal}>
                    {this.renderModal()}
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        filterTags: state.movieFilter.tags,
        filterModels: state.movieFilter.models
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateTagsFilter: (tags) => dispatch(updateTagsFilterAct(tags)),
        updateModelsFitler: (models) => dispatch(updateModelsFilterAct(models)),
        resetFilter: () => dispatch(resetFilterAct())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);