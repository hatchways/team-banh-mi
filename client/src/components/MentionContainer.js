import React, { useEffect, useState, useContext } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Mention from "../components/Mention/Mention";
import Spinner from "../components/Spinner";
import { UserStateContext, UserDispatchContext } from "../context/userContext";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const MentionContainer = (props) => {
  const { companyName, search } = props;
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [mentions, setMentions] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const state = useContext(UserStateContext);
  const styles = useStyles();

  useEffect(() => {
    const makeCallToBackEnd = async (companyName) => {
      try {
        const { data } = await axios(
          `/mention/company/${companyName}?search=${search}`
        );
        setMentions(data);
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
  }, [companyName, mentions.length, itemsPerPage, state, search]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const mentionsRender = mentions
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
        favorite={mention.favorite}
        mood={mention.mood}
        url={mention.url}
      />
    ))
    .slice((page - 1) * itemsPerPage, page * itemsPerPage);

  if (isLoading)
    return (
      <div className={styles.root}>
        <Spinner />
      </div>
    );

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
