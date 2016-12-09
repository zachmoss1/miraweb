import React from "react";
import * as SettingsActions from "../actions/settings.js";
import SettingsStore from "../stores/settings.js";
import { LICENSE, SETTING_SCREENS } from "../lib/constants.js";

import Column from "./column.jsx";
import Dialog from "./dialog.jsx";
import Grid from "./grid.jsx";

const BASE_CLASS = "mw-about";

export default class AboutScreen extends React.Component {

	constructor(props) {
		super(props);

		this.state = this._buildState();
		this._unsubscribes = [];
		this._unsubscribes.push(SettingsStore.listen(this._onUpdate.bind(this)));
	}

	_onUpdate() {
		this.setState(this._buildState());
	}

	componentWillUnmount() {
		this._unsubscribes.forEach((f) => {
			f();
		});
	}

	_buildState() {
		return {
			show : SettingsStore.areShown() && SettingsStore.getShownScreen() === SETTING_SCREENS.ABOUT
		};
	}

	_onToggleView() {
		SettingsActions.toggleView(false);
	}

	render() {
		return (
			<Dialog show={ this.state.show } onClose={ this._onToggleView.bind(this) } title="About" className={ BASE_CLASS } >
				<Grid >
					<Column size={ 12 } className="text-center">
						MiraWeb Logo here
					</Column>
					<Column size={ 12 } >
						<p>
							MiraWeb is an example usecase of a client build based on the xebra.js package. Are you interested in working on
							your own project communicating with Max MSP in similar fashion? Check out the <a href="https://github.com/Cycling74/xebra.js" target="_blank" >xebra.js project</a>.
						</p>
						<p>
							If you find any bugs or would like to share your feedback, feature requests etc. please visit the MiraWeb project on GitHub.
						</p>
					</Column>
				</Grid>
				<Grid distribution="between" className="text-center">
					<Column size={ 12 } >
						<h3>Visit us here</h3>
					</Column>
					<Column size={ 6 } >
						<a href="http://cycling74.com" target="_blank">
							<img
								src="data:image/png;base64,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"
							/>
						</a>
					</Column>
					<Column size={ 6 } className="text-center" >
						<a href="http://github.com/Cycling74" target="_blank">
							<img
								src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTE3OEEzMjk5QTAxMUUyOUExNUJDMTA0NkE4OTA0RCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyQTQxNEFCQzk5QTExMUUyOUExNUJDMTA0NkE4OTA0RCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkU1MTc4QTMwOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkU1MTc4QTMxOTlBMDExRTI5QTE1QkMxMDQ2QTg5MDREIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+R7ClIwAADR5JREFUeNrsnQuw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"
							/>
						</a>
					</Column>
				</Grid>
				<Grid>
					<Column size={ 12 } className="text-center">
						<h3>License</h3>
					</Column>
					<Column size={ 12 }>
						<p className="mw-license-text" dangerouslySetInnerHTML={ { __html : LICENSE } } />
					</Column>
				</Grid>
			</Dialog>
		)
	}
}