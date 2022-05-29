<!doctype html>
<html lang="ru" class="h-100">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="{{ asset('css/app.css') }}" rel="stylesheet">

    <title>Easy English</title>
</head>
<body class="d-flex flex-column h-100 bg-dark" style="--bs-bg-opacity: .95;">
    <header>

        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container-md mx-auto">
                <a class="navbar-brand mb-0 h1" href="#" style="padding-bottom: 10px;">
                    <div class="fs-2">
                        Easy English
                    </div>
                </a>
                <div class="d-flex flex-row-reverse bd-highlight">
                    <button type="button" class="btn btn-outline-info me-2" onclick="changeLanguage()">Eng ⇄ Rus</button>
                    <button type="button" class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#exportModal" onclick="exportList()">Выбрать словарь</button>
                    <button type="button" class="btn btn-outline-light me-2" data-bs-toggle="modal" data-bs-target="#importModal">Загрузить словарь</button>
                </div>
            </div>
        </nav>
    </header>

    <main class="flex-shrink-0">
        <div class="container" style="padding-top: 140px; padding-bottom: 20px;">

            <div class="modal fade" id="importModal" tabindex="-1" aria-labelledby="importModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="importModalLabel">Загрузить словарь</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="importDictonary">
                            <div class="modal-body">
                                <div class="container text-center">
                                    Словарь должен загружатся в .csv формате
                                </div>
                                <div class="container text-center">
                                    И состоять из 2 колонок: eng и rus
                                </div>
                                <div class="container text-center mb-3">
                                    (Разделители: запятые)
                                </div>
                                <div class="mb-3">
                                    <input type="file" class="form-control" id="csvFile" accept=".csv">
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                                <input type="submit" value="Загрузить" class="btn btn-primary" data-bs-dismiss="modal">
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="modal fade" id="exportModal" tabindex="-1" aria-labelledby="exportModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exportModalLabel">Выбрать словарь</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form id="exportDictonary">
                            <div class="modal-body">
                                <div class="mb-3">
                                    <div class="list-group" id="exportList">
                                        <button type="button" class="list-group-item list-group-item-action" data-bs-dismiss="modal" onclick="changeDictonary(0)">Жопа.csv (Кол-во слов: 2)</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div class="row g-4" style="padding-bottom: 20px">
                <div class="col-sm-6">
                    <div class="card text-center">
                        <div class="card-body">
                            <div class="card d-flex justify-content-center text-center" style="height: 200px;">
                                <h1 class="card-title" id="firstWord">Apple</h1>
                            </div>
                            <p class="card-text"></p>
                            <a href="#" class="btn btn-primary" onclick="changeWord(false)">Предыдущее слово</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card text-center">
                        <div class="card-body">
                            <div class="card d-flex justify-content-center text-center" style="height: 200px;">
                                <h1 class="card-title" id="secondWord">?</h1>
                            </div>
                            <p class="card-text"></p>
                            <a href="#" class="btn btn-primary" onclick="changeWord(true)">Следующее слово</a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card text-center">
                <div class="card-body">
                    <h2 id="wordsCount">1/2</h2>
                    <a href="#" class="btn btn-primary" onclick="showTranslate()">Показать перевод</a>
                </div>
            </div>
        </div>
        <div class="container text-white" style="padding-top: 50px; padding-bottom: 50px;">
            <h2 class="text-center" id="dictonaryInfo">Используется словарь: TestWords.csv (Кол-во слов: 2)</h2>
        </div>
    </main>

    <footer class="footer mt-auto py-3 bg-dark">
        <div class="container">
            <ul class="nav justify-content-center border-bottom pb-3 mb-3">
                <li class="nav-item"><a href="https://github.com/TriggeredP/EasyEnglish" class="nav-link px-2 text-muted">GitHub</a></li>
            </ul>
            <p class="text-center text-muted">Easy English</p>
        </div>
    </footer>

    <script src="{{ asset('js/hehe.js') }}"></script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
