import PropTypes from 'prop-types';
import React from 'react';
import {withRouter} from 'react-router-dom'
import {createFragmentContainer, graphql} from 'react-relay';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Typography from "@material-ui/core/Typography/Typography";
import CardActions from "@material-ui/core/CardActions/CardActions";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Icon from "@material-ui/core/Icon/Icon";
import {cirrusColors} from "../cirrusTheme";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import classNames from 'classnames';


const styles = theme => ({
  title: {
    backgroundColor: cirrusColors.cirrusGrey
  },
  settingGap: {
    paddingTop: 16
  },
  gap: {
    paddingTop: 16
  },
  row: {
    display: 'flex',
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

const ORGANIZATIONAL_PRIVATE_REPOSITORIES_PLAN_ID = 993;

class GitHubOrganizationSettings extends React.Component {
  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    let {info, organization, classes} = this.props;
    console.log(info);
    let githubMarketplaceComponent = (
      <div>
        <Typography variant="subheading">
          No GitHub Marketplace plan has been configured!
        </Typography>
      </div>
    );
    let actionButton = (
      <Button variant="contained"
              href={`https://github.com/marketplace/cirrus-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW45OTM=?account=${organization}`}>
        <Icon className={classNames(classes.leftIcon, "fa", "fa-github")}/>
        Purchase Plan for Private Repositories
      </Button>
    );
    let cancelPlanButton = null;
    if (info.purchase && info.purchase.planId === ORGANIZATIONAL_PRIVATE_REPOSITORIES_PLAN_ID) {
      githubMarketplaceComponent = (
        <div>
          <Typography variant="subheading">
            Purchased GitHub Plan: <b>{info.purchase.planName}</b> for <b>{info.purchase.unitCount}</b> seats
          </Typography>
          <Typography variant="subheading">
            Amount of monthly active users under the plan: <b>{info.activeUsersAmount}</b>
          </Typography>
          <Typography variant="subheading">
            Available seats: <b>{info.purchase.unitCount - info.activeUsersAmount}</b>
          </Typography>
        </div>
      );
      actionButton = (
        <Button variant="contained"
                href={`https://github.com/marketplace/cirrus-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW45OTM=?account=${organization}`}>
          <Icon className={classNames(classes.leftIcon)}>group_add</Icon>
          Add More Seats
        </Button>
      );
      cancelPlanButton = (
        <Button variant="contained"
                href={`https://github.com/marketplace/cirrus-ci/order/MDIyOk1hcmtldHBsYWNlTGlzdGluZ1BsYW45OTA=?account=${organization}`}>
          <Icon className={classNames(classes.leftIcon, "fa", "fa-github")}/>
          Cancel Plan
        </Button>
      );
    }
    return (
      <div>
        <Paper elevation={1}>
          <Toolbar className={classes.title}>
            <Typography variant="title" color="inherit">
              Settings for {organization} organization
            </Typography>
          </Toolbar>
        </Paper>
        <div className={classes.settingGap}/>
        <Paper elevation={1}>
          <Card>
            <CardHeader title="GitHub Settings"/>
            <CardContent>
              {githubMarketplaceComponent}
            </CardContent>
            <CardActions>
              {cancelPlanButton}
              {actionButton}
            </CardActions>
          </Card>
        </Paper>
      </div>
    );
  }
}

export default createFragmentContainer(withRouter(withStyles(styles)(GitHubOrganizationSettings)), {
  info: graphql`
    fragment GitHubOrganizationSettings_info on GitHubOrganizationInfo {
      name
      role
      activeUsersAmount
      purchase {
        planId
        planName
        unitCount
      }
    }
  `,
});
