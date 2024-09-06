/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tmutation AddComment($input: CommentsInsertInput!) {\n\t\tinsertIntoCommentsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n": types.AddCommentDocument,
    "\n\tfragment Comment on Comments {\n\t\tid\n\t\tcreatedAt\n\t\tcontent\n\t\tuser {\n\t\t\tusername\n\t\t}\n\t}\n": types.CommentFragmentDoc,
    "\n\tmutation DeleteAllComments($storyboardId: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n": types.DeleteAllCommentsDocument,
    "\n\tmutation DeleteComment($id: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n": types.DeleteCommentDocument,
    "\n\tmutation AddFile($input: FilesInsertInput!) {\n\t\tinsertIntoFilesCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n": types.AddFileDocument,
    "\n\tmutation DeleteFile($storyboardId: UUID!) {\n\t\tdeleteFromFilesCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n": types.DeleteFileDocument,
    "\n\tfragment File on Files {\n\t\tid\n\t\tname\n\t\tstoryboardId\n\t}\n": types.FileFragmentDoc,
    "\n\tquery GetFiles {\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...File\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetFilesDocument,
    "\n\tmutation EditLesson($id: UUID!, $input: LessonsUpdateInput!) {\n\t\tupdateLessonsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Lesson\n\t\t\t}\n\t\t}\n\t}\n": types.EditLessonDocument,
    "\n\tquery GetFirstLesson {\n\t\tlessonsCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Lesson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetFirstLessonDocument,
    "\n\tfragment Lesson on Lessons {\n\t\tid\n\t\ttitle\n\t\tversionsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tversionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.LessonFragmentDoc,
    "\n\tmutation AddStoryboard($input: StoryboardsInsertInput!) {\n\t\tinsertIntoStoryboardsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n": types.AddStoryboardDocument,
    "\n\tmutation DeleteStoryboard($id: UUID!) {\n\t\tdeleteFromStoryboardsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n": types.DeleteStoryboardDocument,
    "\n\tmutation EditStoryboard($id: UUID!, $input: StoryboardsUpdateInput!) {\n\t\tupdateStoryboardsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n": types.EditStoryboardDocument,
    "\n\tquery GetStoryboards($lessonId: UUID!) {\n\t\tstoryboardsCollection(filter: { lessonId: { eq: $lessonId } }) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Storyboard\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetStoryboardsDocument,
    "\n\tfragment Storyboard on Storyboards {\n\t\tid\n\t\tcreatedAt\n\t\ttitle\n\t\tcontent\n\t\tposition\n\t\tcommentsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tusername\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.StoryboardFragmentDoc,
    "\n\tquery GetFirstUser {\n\t\tusersCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...User\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.GetFirstUserDocument,
    "\n\tfragment User on Users {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n": types.UserFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AddComment($input: CommentsInsertInput!) {\n\t\tinsertIntoCommentsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddComment($input: CommentsInsertInput!) {\n\t\tinsertIntoCommentsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Comment on Comments {\n\t\tid\n\t\tcreatedAt\n\t\tcontent\n\t\tuser {\n\t\t\tusername\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Comment on Comments {\n\t\tid\n\t\tcreatedAt\n\t\tcontent\n\t\tuser {\n\t\t\tusername\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteAllComments($storyboardId: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteAllComments($storyboardId: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteComment($id: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteComment($id: UUID!) {\n\t\tdeleteFromCommentsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Comment\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AddFile($input: FilesInsertInput!) {\n\t\tinsertIntoFilesCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddFile($input: FilesInsertInput!) {\n\t\tinsertIntoFilesCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteFile($storyboardId: UUID!) {\n\t\tdeleteFromFilesCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteFile($storyboardId: UUID!) {\n\t\tdeleteFromFilesCollection(filter: { storyboardId: { eq: $storyboardId } }, atMost: 200) {\n\t\t\trecords {\n\t\t\t\t...File\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment File on Files {\n\t\tid\n\t\tname\n\t\tstoryboardId\n\t}\n"): (typeof documents)["\n\tfragment File on Files {\n\t\tid\n\t\tname\n\t\tstoryboardId\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetFiles {\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...File\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFiles {\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...File\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation EditLesson($id: UUID!, $input: LessonsUpdateInput!) {\n\t\tupdateLessonsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Lesson\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation EditLesson($id: UUID!, $input: LessonsUpdateInput!) {\n\t\tupdateLessonsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Lesson\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetFirstLesson {\n\t\tlessonsCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Lesson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFirstLesson {\n\t\tlessonsCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Lesson\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Lesson on Lessons {\n\t\tid\n\t\ttitle\n\t\tversionsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tversionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Lesson on Lessons {\n\t\tid\n\t\ttitle\n\t\tversionsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tversionNumber\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation AddStoryboard($input: StoryboardsInsertInput!) {\n\t\tinsertIntoStoryboardsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation AddStoryboard($input: StoryboardsInsertInput!) {\n\t\tinsertIntoStoryboardsCollection(objects: [$input]) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation DeleteStoryboard($id: UUID!) {\n\t\tdeleteFromStoryboardsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation DeleteStoryboard($id: UUID!) {\n\t\tdeleteFromStoryboardsCollection(filter: { id: { eq: $id } }) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tmutation EditStoryboard($id: UUID!, $input: StoryboardsUpdateInput!) {\n\t\tupdateStoryboardsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tmutation EditStoryboard($id: UUID!, $input: StoryboardsUpdateInput!) {\n\t\tupdateStoryboardsCollection(filter: { id: { eq: $id } }, set: $input) {\n\t\t\trecords {\n\t\t\t\t...Storyboard\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetStoryboards($lessonId: UUID!) {\n\t\tstoryboardsCollection(filter: { lessonId: { eq: $lessonId } }) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Storyboard\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetStoryboards($lessonId: UUID!) {\n\t\tstoryboardsCollection(filter: { lessonId: { eq: $lessonId } }) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...Storyboard\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment Storyboard on Storyboards {\n\t\tid\n\t\tcreatedAt\n\t\ttitle\n\t\tcontent\n\t\tposition\n\t\tcommentsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tusername\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tfragment Storyboard on Storyboards {\n\t\tid\n\t\tcreatedAt\n\t\ttitle\n\t\tcontent\n\t\tposition\n\t\tcommentsCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tuser {\n\t\t\t\t\t\tid\n\t\t\t\t\t\tusername\n\t\t\t\t\t\tcreatedAt\n\t\t\t\t\t}\n\t\t\t\t\tcontent\n\t\t\t\t\tcreatedAt\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\tfilesCollection {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery GetFirstUser {\n\t\tusersCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...User\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery GetFirstUser {\n\t\tusersCollection(first: 1) {\n\t\t\tedges {\n\t\t\t\tnode {\n\t\t\t\t\t...User\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tfragment User on Users {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n"): (typeof documents)["\n\tfragment User on Users {\n\t\tid\n\t\tusername\n\t\temail\n\t}\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;