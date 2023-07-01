import { Book } from "contentlayer/generated"
import moment from "moment"

export const BookListItem = ({ books }: { books: Book[] }) => {
  return (
    <>
      {books.map((b) => {
        return (
          <div
            className="grid grid-cols-1 gap-y-2 md:gap-y-0 md:grid-cols-3 justify-between align-middle items-center"
            key={b.title}
          >
            <div className="col-span-2">
              <h5 className="text-black font-medium text-md font-heading">
                {b.title}
              </h5>
              <p className="text-sm">{b.authors?.join(", ")}</p>
            </div>
            <div className="flex justify-start md:justify-end space-x-4 col-span-1">
              {b.start ? (
                <div>
                  <p className="text-xs">
                    {moment(b.start).format("MMM Do, YYYY")}
                  </p>
                  <p className="text-xs">STARTED</p>
                </div>
              ) : null}
              {b.end ? <p>-</p> : null}
              {b.end ? (
                <div className="flex space-x-4">
                  <div>
                    <p className="text-xs">
                      {moment(b.end).format("MMM Do, YYYY")}
                    </p>
                    <p className="text-xs">COMPLETED</p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
    </>
  )
}
