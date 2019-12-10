#!/bin/bash

#   scan database/ folder
#   get <filename> s
#   find statement like
#   INSERT INTO `meta_sql_scripts`(`filename`,`applied_time`) VALUES ('<filename>', NOW());
#   INSERT INTO `meta_sql_scripts`(`filename`,`applied_time`) VALUES ('V2.3.0.671__OABP.sql', NOW());
#

# read all files
for file in ../../database/*; do
    echo -ne "$(basename $file) \t\t "

    # check for "meta_sql_scripts"
    meta_sql=$(grep meta_sql_scripts $file)
    if [[ -z $meta_sql ]]
    then
        echo "line containing meta_sql_scripts not found"
    else
        # remove additional spaces
        space_removed=$(echo $meta_sql | xargs)

        # check for the file_name inside "meta_sql_scripts" line
        file_name_var=$(grep $(basename $file) <<< $space_removed )
        if [[ -z $file_name_var ]]
        then
            echo "file name mismatched"
        else
            echo "correct file name"
        fi
    fi
done


# seperate the file name from sql query
#v2=$(grep INS n1.txt)

#v2=$( echo $v2 | sed -e 's/ //g' )
#my_array=(${v2//,/ })

#echo ${my_array[-2]} | cut -d "(" -f2
