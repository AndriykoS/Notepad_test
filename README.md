# Notepad_test

#### Установка:
Каталог модуля перемістити в /usr/abills/Abills/modules/

В терміналі ввести ```sudo ln -s /usr/abills/Abills/modules/Notepad_test/js/ /usr/abills/cgi-bin/styles/default_adm/js/```, 
```sudo ln -s /usr/abills/Abills/modules/Notepad_test/sticker_style.css /usr/abills/cgi-bin/styles/default_adm/css/```,```sudo ln -s /usr/abills/Abills/modules/Notepad_test/templates/notepad_sticker_sp.tpl /usr/abills/Abills/main_tpls/```,```sudo ln -s /usr/abills/Abills/modules/Notepad_test/js/ /usr/abills/Abills/templates/``` та ```sudo ln -s /usr/abills/Abills/modules/Notepad_test/sticker_style.css /usr/abills/Abills/templates/```.


В файлі **config.pl**:
```
@MODULES = (
             'Notepad_test'
           );
```
