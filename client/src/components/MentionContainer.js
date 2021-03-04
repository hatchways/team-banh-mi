import React, { useEffect, useState, useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Mention from "../components/Mention/Mention";
import Spinner from "../components/Spinner";
import { UserStateContext, UserDispatchContext } from "../context/userContext";
import * as actionTypes from "../store/actionTypes";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const filterMentions = (mentions, filterObject) => {
  const filteredMentions = [];
  if (filterObject.onlyFavorites) {
    const filteredResults = mentions.filter((mention) => mention.favorite);
    filteredMentions.push(...filteredResults);
  }
  return filteredMentions.length > 0 || filterObject.onlyFavorites === true
    ? filteredMentions
    : mentions;
};

const MentionContainer = (props) => {
  const { companyName } = props;
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [mentions, setMentions] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const state = useContext(UserStateContext);
  const dispatch = useContext(UserDispatchContext);
  const styles = useStyles();

  useEffect(() => {
    const makeCallToBackEnd = async (companyName) => {
      try {
        const { data, status } = await axios(`/mention/company/${companyName}`);
        const filteredMentions = await filterMentions(data, state);
        setMentions(filteredMentions);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    makeCallToBackEnd(companyName);
    setNumberOfPages(() => {
      return Math.ceil(mentions.length / itemsPerPage);
    });
  }, [companyName, mentions.length, itemsPerPage, state]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const mentionsRender = mentions
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((mention, key) => (
      <Mention
        id={mention._id}
        className={styles.mention}
        key={key}
        title={mention.title}
        source={mention.platform}
        body={mention.content}
        imgSrc={mention.image}
        imgAlt={mention.platform}
        mood="good"
        favorite={mention.favorite}
        url={mention.url}
      />
    ));

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.root}>
      <div className={styles.mentions}>{mentionsRender}</div>
      <Pagination
        count={numberOfPages}
        page={page}
        onChange={handlePageChange}
        defaultPage={1}
        size="large"
        color="primary"
        className={styles.pagination}
      />
    </div>
  );
};

export default MentionContainer;
