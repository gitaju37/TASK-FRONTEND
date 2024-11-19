import './Home.css'

const ShortUrl = () => {
  return (
    <div className="shorturl-container ">
      <div className='shorturl-box d-flex flex-column align-items-start'>
          <h3 className='' >Create New Short Url</h3>
          <h5 className='' >Paste your url Here</h5>
          <input placeholder="URL" className='input-box'></input>
          <button className="btn btn-warning ">CREATE</button>
      </div>
    </div>
  )
}

export default ShortUrl
