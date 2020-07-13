let movie = [
    { id: 1, title: "스타워즈", director: "조지 루카스", year: "1977" },
    { id: 2, title: "아바타", director: "제임스 카메론", year : "2009" },
    { id: 3, title: "인터스텔라", director: "크리스토퍼 놀란", year : "2014" }
];
let nextId = 4;
// 목록조회
const list = (req, res) => {
    const limit = parseInt(req.query.limit || 10);
    if (Number.isNaN(limit)) return res.status(400).end(); // 숫자가 아닌경우
    res.json(movie.slice(0, limit));
};
// 상세조회
const detail = (req, res) => {
    const id = parseInt(req.params.id);

    if (Number.isNaN(id)) return res.status(400).end();

    //const result = music.find((m) => m.id === id);
    const result = movie.filter((m) => m.id === id);
    // filter는 array를 리턴함

    if (!result) return res.status(404).end();
    res.json(result);
};
// 등록
const create = (req, res) => {
    const { title, director, year} = req.body;
    if(!title || !director || !year) return res.status(400).end();
    const m = { id: nextId++, title, director, year };
    movie.push(m);
    res.status(201).json(m);
};
// 수정
const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();

  const result = movie.find((m) => m.id === id);
  if (!result) return res.status(404).end();
  //성공시
  const { title, director, year } = req.body;

  if (title) result.title = title;
  if (director) result.director = director;
  if (year) result.year = year;
  res.json(result);
};

// 삭제
const remove = (req, res) => {
    const id = parseInt(req.params.id);
    if (Number.isNaN(id)) return res.status(400).end();

    const result = movie.find(m => m.id === id)
    if (!result) return res.status(404).end();

    movie = movie.filter((m) => m.id !== id);
    res.json(movie);
};

module.exports = { list, detail, create, update, remove };