import React, { useEffect, useState, useReducer, useContext } from "react";
import { UserStateContext, UserDispatchContext } from "../context/userContext";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core";
import axios from "axios";
import Mention from "../components/Mention/Mention";
import Spinner from "../components/Spinner";

const useStyles = makeStyles((theme) => ({
  pagination: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
}));

const MentionContainer = () => {
  const itemsPerPage = 10;
  const { id, onlyFavorites, favoriteMentions, companyName } = useContext(
    UserStateContext
  );
  const [isLoading, setIsLoading] = useState(true);
  const [mentions, setMentions] = useState([]);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const styles = useStyles();

  useEffect(() => {
    const getMentions = async (companyName) => {
      try {
        if (!onlyFavorites) {
          const { data } = await axios(`/mention/company/${companyName}`);
          setMentions(data);
          setIsLoading(false);
        }
        if (onlyFavorites) {
          const { data } = await axios(`/${id}/favoriteMentions/`);
          setMentions(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    const addFavoritePropertyToLocalMentions = (mentions, favoriteMentions) => {
      //! Warning: O(n2) - for more efficient solutions, add a "favorite"
      //! property in mentions db (maybe with an array of user id's).
    };

    getMentions(companyName);
    if (!onlyFavorites)
      addFavoritePropertyToLocalMentions(mentions, favoriteMentions);

    setNumberOfPages(() => {
      return Math.ceil(mentions.length / itemsPerPage);
    });
  }, [id, onlyFavorites, companyName, mentions.length, itemsPerPage]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const mentionsRender = mentions
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((mention, key) => (
      <Mention
        className={styles.mention}
        key={key}
        title={mention.title}
        source={mention.platform}
        body={mention.content}
        imgSrc={mention.image}
        imgAlt={mention.platform}
        mood="good"
        favorite={mention.favorite} // Add this property using addFavoritePropertyToLocalMentions
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
