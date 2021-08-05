import React from "react";
import { Input,HStack } from "@chakra-ui/react"
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SearchIcon, } from '@chakra-ui/icons'
import { SEARCH_QUERY } from "../../redux/constants/searchConstants";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const searchQuery = useSelector((state) => state.searchQuery);
  const {text} = searchQuery

  const onChange = (e) => {
      
    dispatch({type:SEARCH_QUERY,payload:{text:e.target.value}})
  };

  const onSubmit = (e) => {
    e.preventDefault()
    history.push(`/shop/?${text}`)
  };
  return <div>
      <form onSubmit={onSubmit}>
      <HStack>
      <Input type='text' onChange={onChange} value={text} variant="flushed" placeholder="Search" />
      <SearchIcon onClick={onSubmit} style={{cursor:"pointer"}} />
      </HStack>
      </form>
  </div>;
};

export default Search;
