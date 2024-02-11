// queries.js
import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query GetAllUsers($page: Int, $limit: Int, $sortField: String, $sortOrder: String) {
    allUsers(page: $page, limit: $limit, sortField: $sortField, sortOrder: $sortOrder) {
      id
      name
      email
      contact
      address
      city
      zip
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      contact
      address
      city
      zip
    }
  }
`;
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $data: JSON!) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      contact
      address
      city
      zip
    }
  }
`;

export const INSERT_USER = gql`
  mutation InsertUser($userData: UserInput!) {
    insertUser(userData: $userData) {
      id
      name
      email
      contact
      address
      city
      zip
    }
  }
`;
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;