import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import PaginationSimple from './PaginationSimple'

/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListPage = ({ page = 1, posts = [], postCount, siteInfo }) => {
  const { NOTION_CONFIG } = useGlobal()
  const POSTS_PER_PAGE = siteConfig('POSTS_PER_PAGE', null, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / POSTS_PER_PAGE)
  const showPagination = postCount >= POSTS_PER_PAGE
  if (!posts || posts.length === 0 || page > totalPage) {
    return <BlogPostListEmpty />
  } else {
    // return (
    //   <div className='w-full'>
    //     <div className='pt-6'></div>
    //     {/* 文章列表 */}
    //     <div className='pt-4 flex flex-wrap pb-12'>
    //       {posts?.map((post, index) => (
    //         <div key={post.id} className='xl:w-1/3 md:w-1/2 w-full p-4'>
    //           {' '}
    //           <BlogPostCard index={index} post={post} siteInfo={siteInfo} />
    //         </div>
    //       ))}
    //     </div>
    //     {showPagination && (
    //       <PaginationSimple page={page} totalPage={totalPage} />
    //     )}
    //   </div>
    // )
    return (
  <div className='w-full'>
    <div className='pt-6'></div>
    {/* 文章列表 */}
    <div className='pt-4 flex flex-wrap pb-12'>
      {posts
        ?.sort((a, b) => {
          const dateA = new Date(a?.lastEditedDay || a.date?.start_date );
          const dateB = new Date( b?.lastEditedDay|| b.date?.start_date );
          return dateB - dateA; // 最新日期优先
        })
        .map((post, index) => (
          <div key={post.id} className='xl:w-1/3 md:w-1/2 w-full p-4'>
            <BlogPostCard index={index} post={post} siteInfo={siteInfo} />
          </div>
        ))}
    </div>
    {showPagination && (
      <PaginationSimple page={page} totalPage={totalPage} />
    )}
  </div>
    ) 
  }
}

export default BlogPostListPage
