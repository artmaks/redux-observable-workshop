import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Action } from './common/helpers';
import { Icon } from './common/icon.component';
import { DashboardPanel } from './common/dashboard-panel.component';

import './app.style';

import {
  SYNC_START,
  SYNC_STOP,
} from './sync/reducer';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(Action(SYNC_START));
    }

    getState() {
        return this.props.state;
    }


    isLoading(type) {
        if (type !== 'wind') {
            return this.getState()[type].loading;
        }
        else {
            const { wind } = this.getState();
            return wind.speed.loading || wind.direction.loading;
        }
    }


    getConditionsIcon() {
        const { conditions } = this.getState();
        const notPrefixedIcons = ['na','hot','meteor'];
        return notPrefixedIcons.includes(conditions) ? conditions : `day-${conditions}`;
    }


    getValue(type) {
        const { state } = this.props;
        const pathSegments = type.split('.');

        let value;

        if (pathSegments[0] === 'wind') {
            value = state.wind[pathSegments[1]].value;
        }
        else {
            value = state[pathSegments[0]].value;
        }

        return value == null ? '--' : value;
    }


    hasError(type) {
        const state = this.getState();
        return state[type].error != null;
    }

    getWindDirectionIcon() {
        const direction = this.getState().wind.direction.value;
        if (direction == null) {
            return 'na';
        }
        return `wind wi-from-${direction}`;
    }

    render() {
        return (
            <div className="App">
                <div className="navbar navbar-default">
                    <div className="container">

                        <div className="navbar-header">
                            <div className="navbar-brand">
                                Weather monitor X9000
                            </div>
                        </div>

                    </div>
                </div>

                <div className="container">

                    <div className="panel panel-default">
                        <div className="panel-body">
                            <div className="conditions-icon text-warning text-center">
                                <Icon name={this.getConditionsIcon()} />
                            </div>
                        </div>
                    </div>


                    <div className="row">

                        <div className="col-xs-12 col-sm-4">

                            <DashboardPanel
                                error={this.hasError('temperature')}
                                loading={this.isLoading('temperature')}
                                icon="thermometer"
                                value={`${this.getValue('temperature')} °C`}
                            />

                        </div>

                        <div className="col-xs-12 col-sm-4">

                            <DashboardPanel
                              error={this.hasError('wind')}
                              loading={this.isLoading('wind')}
                              icon={this.getWindDirectionIcon()}
                              iconClassName="wind-direction-icon"
                              iconType="wi"
                              value={`${this.getValue('wind.speed')} m/s`}
                            />

                        </div>

                        <div className="col-xs-12 col-sm-4">


                            <DashboardPanel
                              error={this.hasError('humidity')}
                              loading={this.isLoading('humidity')}
                              icon="humidity"
                              value={this.getValue('humidity')}
                            />

                        </div>

                    </div>

                </div>
            </div>
        );
    }
};


const mapStateToProps = (state) => {
    return { state };
};


const connectedApp = connect(
    mapStateToProps,
)(App);


export { connectedApp as App };
